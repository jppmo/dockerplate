import React, { Component } from 'react';
// React DND
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import InnerListCol from './column';
// CSS
import styled from 'styled-components';

const Container = styled.div`
    display: flex;  
`;

export default class DNDDefContext extends Component {
    state = this.props.dataDND;

    componentDidMount() {
    }

    onDragStart = (start, provided) => {
        document.body.style.color = 'orange';
        document.body.style.transition = 'background-color 0.2s ease';
    }

    onDragUpdate = (update, provided) => {
        const { destination } = update;
        const opacity = destination 
            ? destination.index / Object.keys(this.state.items).length
            : 0;
        document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
    }

    onDragEnd = (result, provided) => {
        document.body.style.color = 'inherit';
        document.body.style.backgroundColor = 'inherit';
        const { destination, source, draggableId, type } = result;

        if(!destination) {
            return;
        }

        if(destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if(type === 'column') {
            const newColumnOrder = Array.from(this.state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
    
            const newState = {
                ...this.state,
                columnOrder: newColumnOrder
            };
    
            this.setState(newState);
            return;         
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if( start === finish) {
            const newitemIds = Array.from(start.itemIds);
            newitemIds.splice(source.index, 1);
            newitemIds.splice(destination.index, 0, draggableId);
    
            const newColumn = {
                ...start,
                itemIds: newitemIds,
            };
    
            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            };
    
            this.setState(newState);
            return;
        }

        // Moving from on list to another
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
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            }
        };

        this.setState(newState);
        return;
    }

    render() {
        return (
            <div>
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
                                {this.state.columnOrder.map( (columnId, index) => {
                                    const column = this.state.columns[columnId];
                                    return (
                                        <InnerListCol 
                                            key={column.id} column={column} items={this.state.items} index={index}
                                        />
                                    );
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
