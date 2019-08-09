import React, { Component } from 'react';
// React DND
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import InnerListCol from './dnd/column';
// CSS
import styled from 'styled-components';

const Container = styled.div`
    // display: flex;
    // display: grid;
    // grid-template-rows: 50% 50%;
    // grid-template-columns: 20% 80%;

    display: grid;
    grid-template-rows: 300px 300px 300px;
    grid-template-columns: 300px 600px;
`;

export default class DNDContext extends Component {
    /* State: { items, columns, columnOrder } */
    state = { data: this.props.dataDND }

    // Testing
    printState(context) {
        console.info('State: ', context.state);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(props) {
        this.setState({ data: props.dataDND });
    }

    // Drag Events
    onDragStart = (start, provided) => {
        let func = this.props.onDragStart;
        func = func.bind(this);
        func(start, provided, this.state);
    }

    onDragUpdate = (update, provided) => {
        let func = this.props.onDragUpdate;
        func = func.bind(this);
        func(update, provided, this.state);
    }

    onDragEnd = (result, provided) => {
        const { destination, source, draggableId } = result;

        // Irrelevant Drops
        if(!destination) { return; }
        if(destination.droppableId === source.droppableId && destination.index === source.index) { return; }

        // Call Method
        let func = this.props.onDragEnd;
        func = func.bind(this);
        func(result, provided, this.state);

        console.log('merde: ', result);
        // Move items
        const start = this.state.data.columns[source.droppableId];
        const finish = this.state.data.columns[destination.droppableId];
        // -- Same list
        if( start === finish) {
            this.moveDragSameCol(result, start);
        // -- Dif lists
        } else {
            this.moveDragDifCol(result, start, finish);
        }
        
        return;
    }

    // Update Card Positioning
    moveDragDifCol(result, start, finish) {
        const { destination, source, draggableId } = result;

        const startitemIds = Array.from(start.itemIds);
        startitemIds.splice(source.index, 1);
        const newStart = {
            ...start,
            itemIds: startitemIds,
        };

        const finishitemIds = Array.from(finish.itemIds);
        finishitemIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            itemIds: finishitemIds,
        };

        const newState = {
            data: {
                ...this.state.data,
                columns: {
                    ...this.state.data.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish,
                }
            }
        };

        this.setState(newState);
        return;
    }

    moveDragSameCol(result, start) {
        const { destination, source, draggableId } = result;

        const newitemIds = Array.from(start.itemIds);
        newitemIds.splice(source.index, 1);
        newitemIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...start,
            itemIds: newitemIds,
        };

        const newState = {
            data: {
                ...this.state.data,
                columns: {
                    ...this.state.data.columns,
                    [newColumn.id]: newColumn
                }
            }

        };

        this.setState(newState);
        return;
    }

    render() {
        return (
            <div>
                <button onClick={() => this.printState(this)}>habitDND</button>
                <DragDropContext
                    onDragStart=    {this.onDragStart}
                    onDragUpdate=   {this.onDragUpdate}
                    onDragEnd=      {this.onDragEnd}
                >
                    <Droppable droppableId='all-columns' direction='horizontal' type='column'>
                        { provided => (
                            <Container 
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {this.state.data.columnOrder.map( (columnId, index) => {
                                    const column = this.state.data.columns[columnId];
                                    let isDropDisabled = false;
                                    
                                    switch (column.id) {
                                        case 'stack':
                                            isDropDisabled = 
                                                this.state.homeId === 'active' ||
                                                this.state.data.columns.stack.itemIds.length >= 9;
                                            return (
                                                <InnerListCol 
                                                    style={{'width':'100%'}}
                                                    key={column.id}
                                                    column={column}
                                                    itemMap={this.state.data.items}
                                                    index={index}
                                                    isDropDisabled={isDropDisabled}
                                                />
                                            )
                                        case 'tracking':
                                            isDropDisabled = 
                                                this.state.data.columns.tracking.itemIds.length >= 3;
                                            return (
                                                <InnerListCol 
                                                    key={column.id}
                                                    column={column}
                                                    itemMap={this.state.data.items}
                                                    index={index}
                                                    isDropDisabled={isDropDisabled}
                                                />
                                            )
                                        case 'active':
                                            isDropDisabled = 
                                                this.state.homeId === 'stack' || 
                                                (this.state.homeId === 'tracking' && this.state.dragProgress === 100) ||
                                                this.state.data.columns.active.itemIds.length >= 12;
                                            return (
                                                <InnerListCol 
                                                    key={column.id}
                                                    column={column}
                                                    itemMap={this.state.data.items}
                                                    index={index}
                                                    isDropDisabled={isDropDisabled}
                                                />
                                            )
                                        default:
                                            return null;
                                    }
                                })}
                                {provided.placeholder}
                            </Container>
                        )}
                        
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
}
