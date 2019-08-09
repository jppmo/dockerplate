import React, { Component, PureComponent } from 'react';
// React DND
import { Droppable } from 'react-beautiful-dnd';
import InnerList from './item';
// CSS
import styled from 'styled-components';

const Title = styled.h3`
    padding: 8px;
`;

const TaskList = styled.div`
    padding: 8px;
    background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'inherit')};

    flex-grow: 1;
    min-height: 100px;
`;

const defContainerStyle = {
    'margin': '8px',
    'width': '200px',
    'border': '1px solid lightgrey',
    'borderRadius': '2px',
    'backgroundColor': 'white',

    'display': 'flex',
    'flexDirection': 'column',
};

class InnerListCol extends PureComponent {
    render() {
        const { column, itemMap, index, isDropDisabled } = this.props;
        const items = column.itemIds.map( taskId => itemMap[taskId]);

        return <Column column={column} items={items} index={index} isDropDisabled={isDropDisabled} />;
    }
}

class Column extends Component {
    render() {
        const { isDragDisabled, isDropDisabled, column, items } = this.props;

        return (
            <div className='Container' style={column.style ? column.style : defContainerStyle}> 
                <Title>{column.title}</Title>
                <Droppable  
                    droppableId={column.id} 
                    isDropDisabled={isDropDisabled}
                >
                    {(provided, snapshot) => (
                        <TaskList 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            <InnerList items={items} />
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </div>   
        );
    }
}

export default InnerListCol;