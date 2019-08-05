import React, { Component } from 'react';
// Reacstrap
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
// Test: API Calls
import { diaryAPI } from '../APIDummy/index';
// Components / Containers
import List from '../components/List';
import FormC from '../components/FormC';

class Diary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: [],
            modal: false,
            modalOpened: null, // null, 'add', 'edit'
            editingEntry: null,
            entryForm: [{
                type: 'text',
                name: 'name',
                label: 'Name (Optional)',
                placeholder: 'Day description'
            },
            {
                type: 'textarea',
                name: 'text',
                label: 'Entry',
                placeholder: 'How was it :)?'
            },
            {
                type: 'select',
                name: 'aval',
                label: 'Evaluation',
                placeholder: 'How was it :)?',
                options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            },
            {
                type: 'date',
                name: 'date',
                label: 'Date'
            }],
            test2: {
                name: 'Dia de merda',
                text: 'Foi um dia de merda! :P',
                date: new Date(2000, 10, 24),
                aval: 7,
            }
        }
    
        this.toggle = this.toggle.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    
    componentDidMount() {
        // Get Entries
        diaryAPI('getAllDiaryEntriesByUserId', 10).then(resp => {
            this.setState({
                entries: resp
            })
        });
    }

    // Toggle Modal: 'Add Entry'
    toggle(e, isEdit, item) {
        if(!this.state.modal) {
            isEdit ? 
                this.setState({ modal: true, modalOpened: 'edit', editingEntry: item }) : 
                this.setState({ modal: true, modalOpened: 'add', editingEntry: null });
        } else {
            this.setState({ modal: false, modalOpened: null, editingEntry: null });
        }
    }
    toggleEdit() {
        this.setState(prevState => ({ modalEdit: !prevState.modalEdit }));
    }

    render() {

        return ( 
            <div>
                <Button color="primary" onClick={this.toggle}>New Entry</Button>
                <List 
                    list={this.state.entries} 
                    headers={['Name', 'Text', 'Date', 'Evaluation']}
                    shownEl={['name', 'text', 'date', 'aval']}
                    toggle={this.toggle}
                    hasEditBtn={true}
                />

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Diary Entry</ModalHeader>
                    <ModalBody>
                        {this.state.modalOpened === 'add' ? <FormC toggle={this.toggle} formConfig={this.state.entryForm}/> : null}
                        {this.state.modalOpened === 'edit' ? <FormC toggle={this.toggle} editModel={this.state.editingEntry} formConfig={this.state.entryForm}/> : null}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Diary;