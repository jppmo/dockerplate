import React, { Component } from 'react';
// React DND
import { Draggable } from 'react-beautiful-dnd';
// Reactstrap
import { Collapse, Button, CardText, CardTitle, Card, Toast, ToastBody, ToastHeader } from 'reactstrap';
// CSS
import styled from 'styled-components';

const ContainerTask = styled.div`
    margin: 8px;
    padding: 0.1rem;
    width: 100%;
    border: 1px solid lightgrey;
    border-radius: 2px;
    background-color: ${props => 
        props.isDragDisabled  
            ? 'lightgrey'
            :  props.isDragging 
                ? 'lightgreen'
                : 'white'};

    display: flex;
`;

const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
    margin-right: 8px;
`;

const toastHeaderStyle = {
    display: 'flex',
    'justifyContent': 'space-around'
};

const toastStyle = {
    width: '80%',
    'border': '0px',
    'borderRadius': '2px',
    'boxShadow': 'none'
};

const btnStyle = {

};

class Example extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render() {
        const { item } = this.props;

        return (
            <Toast style={toastStyle}>
                <ToastHeader>
                    <div style={toastHeaderStyle}>
                        <span style={{ 'marginRight': '5px' }}>{item.name}</span>
                        <Button color="primary" onClick={this.toggle} style={btnStyle}>+</Button>
                    </div>

                </ToastHeader>
                <ToastBody>
                    
                    <Collapse isOpen={this.state.collapse}>
                        <CardText>
                            {item.description}
                        </CardText>
                </Collapse>
                </ToastBody>
                
            </Toast>
        );
    }
}

class Task extends Component {
    render() {
        const { item, index, isDragDisabled, contentComponent } = this.props;

        return (
            <Draggable draggableId={item.id} index={index} isDragDisabled={isDragDisabled}>
                {(provided, snapshot) => 
                    <ContainerTask
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        isDragDisabled={isDragDisabled}
                    > 
                        <Handle {...provided.dragHandleProps}/>
                        <Example item={item}/>
                    </ContainerTask>
                }
            </Draggable>
        )
    }
}

class InnerList extends Component {
    shouldComponentUpdate(nextProps) {
        if( nextProps.items === this.props.items) {
            return false;
        }

        return true;
    }
    render() {
        const { items, isDragDisabled, contentComponent } = this.props;

        return items.map((item, index) => (
            item && <Task key={item.id} item={item} index={index} isDragDisabled={isDragDisabled} contentComponent={contentComponent} />
        ));
    }
}

export default InnerList;