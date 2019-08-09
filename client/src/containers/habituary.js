import React, { Component } from 'react';
// React DND
import DNDContext from './habitDND';
// Test: API Calls
import { habitAPI } from '../APIDummy/index';

const columnStyle = {
    'margin': '8px',
    
    'border': '1px solid lightgrey',
    'borderRadius': '2px',
    'backgroundColor': 'white',

    'display': 'flex',
    'flexDirection': 'column',

    // grid-row: 1 / 2;
};

const colStackStyle = {
    'gridRowStart': '1',
    'gridRowEnd': '2'
};
const colTrackingtyle = {

};
const colActiveStyle = {
    'gridColumnStart': '2',
    'gridRowStart': '2',
};

// classnames(columnStyle, colStackStyle)
class Habituary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            columns: {
                'stack':    { id: 'stack', title: 'Stack',  itemIds: [], style: {...columnStyle, ...colStackStyle} },
                'tracking': { id: 'tracking', title: 'Tracking', itemIds: [], style: {...columnStyle, ...colTrackingtyle} },
                'active':   { id: 'active', title: 'Active', itemIds: [], style: {...columnStyle, ...colActiveStyle} }
            },
            columnOrder: ['stack', 'tracking', 'active'],
            onDragStart: function(start, provided, state) {
                document.body.style.color = 'orange';
                document.body.style.transition = 'background-color 0.2s ease';
        
                // Dragging vars
                const dragProgress = state.data.items[start.draggableId].progress;
                const homeId = start.source.droppableId;
                this.setState({
                    homeId,
                    dragProgress
                })
            },
            onDragUpdate: function(update, provided, state) {
                const { destination } = update;
                const opacity = destination     
                    ? destination.index / Object.keys(state.data.items).length
                    : 0;
                document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
            },
            onDragEnd: function(result, provided, state) {
                document.body.style.color = 'inherit';
                document.body.style.backgroundColor = 'inherit';
                const { draggableId } = result;
        
                this.setState({
                    homeId: null,
                    dragProgress: null
                })
        
                // API calls
                const savedState = state.data;
                const updatedHabit = {
                    ...state.data.items[draggableId]
                };
                habitAPI('updateHabit', updatedHabit)
                    .then( resp => {
                        console.info(resp);
                    })
                    .catch( error => {
                        console.error(error);
                        this.setState(savedState);
                        alert(`Couldn't save habit alteration! Reverting...`);
                    });
            }
        };
    }


    componentDidMount() {
        let items = {};
        let columns = this.state.columns;

        // Get Habits
        // TODO: Get Habits and put them in the DnD data structure
        habitAPI('getAllHabitsByUserId', 10).then(resp => {
            resp.forEach( el => {
                let newEl = { [el.id]: el }
                Object.assign(items, newEl)
            });
            this.setState({ items });

            Object.keys(items).forEach( key => {
                switch(items[key].status) {
                    case 'stack':
                        columns.stack.itemIds.push(items[key].id);
                    break;
                    case 'tracking':
                        columns.tracking.itemIds.push(items[key].id);
                    break;
                    case 'active':
                        columns.active.itemIds.push(items[key].id);
                    break;
                    default:
                        console.info('Invalid item status!');
                }
            });
            this.setState({ columns });
        });

    }
    
    // Testing
    printState(context) {
        console.info('State: ', context.state);
    }

    // TODO: Use this function instead of eveything in 'componentDidMount()'
    parseHabitsToDnD() {

    }

    render() {
        return (
            <div>
                <button onClick={() => this.printState(this)}>habituary</button>
                <DNDContext 
                    dataDND={this.state} 
                    onDragStart={this.state.onDragStart} 
                    onDragUpdate={this.state.onDragUpdate} 
                    onDragEnd={this.state.onDragEnd} 
                />
            </div>
        );
    }
}

export default Habituary;