import React, { Component } from 'react';
// Reacstrap
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Spinner } from 'reactstrap';
// DatePicker
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// Test: API Calls
import { diaryAPI } from '../APIDummy/index';

/* props: toggle, editModel, formConfig */
class FormC extends Component {
    constructor(props) {
        super(props);
        const { editModel, formConfig } = props;
        let objModel = {};

        // Filled Model from 'editModel'
        if(editModel) {
            objModel = {...editModel};
        // Empty Model from 'formConfig'
        } else {
            formConfig.forEach(fieldConfig => {
                switch(fieldConfig.type) {
                    case 'date':
                        objModel[fieldConfig.name] = new Date();
                        break;
                    default:
                        objModel[fieldConfig.name] = '';
                }
                
            });
        }

        this.state = {
            objModel: objModel,
            formConfig: formConfig,
            isSubmitting: false,
            isBtnDisabled: true,
        }

        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    // Update Model
    onChange (e) {
        let objModel = this.state.objModel;
        e.target ? objModel[e.target.name] = e.target.value : console.error('No such \'e.target\'!'); 
        this.setState({ objModel: objModel, isBtnDisabled: false })
    }

    // Submit Model
    submit () {
        this.setState({ isSubmitting: true })
        diaryAPI('addDiaryEntryByUserId', this.state.objModel).then(resp => {
            console.info(resp);
            this.props.toggle();
        })
        .catch(error => {
            console.info(error);
            this.setState({ isSubmitting: false })
        });
    }

    render() { 
        return (
            <Form>
                {/* Form Input Groups */}
                {this.state.formConfig.map( fieldConfig => 
                    <FormG  key         ={fieldConfig.name}
                            type        ={fieldConfig.type} 
                            name        ={fieldConfig.name} 
                            label       ={fieldConfig.label} 
                            placeholder ={fieldConfig.placeholder}
                            options     ={fieldConfig.options}
                            value       ={this.state.objModel[fieldConfig.name]}
                            onChange    ={this.onChange} 
                    />
                )}            
                {/* Submit Button */}
                <div>
                    {this.state.isSubmitting ? 
                        <Spinner color="primary" /> :
                        <Button disabled={this.state.isBtnDisabled} onClick={this.submit}>Submit</Button>}
                </div>
            </Form>
        );
    }
}

/* props: label, name, type, onChange, options?, value, placeholder?  */
const FormG = (props) => {
    const { type, name, label, value, onChange,  } = props;

    switch(type) {
        case 'select':
            const { options } = props;
            return (    
                <FormGroup>
                    <Label for={name}>{label}</Label>
                    <Input  type={'select'} 
                            name={name} 
                            id={name} 
                            onChange={onChange}
                            value={value}
                    >
                        {options ? options.map((el, ix) =>  <option key={ix}>{el}</option>) : null}
                    </Input>
                </FormGroup>
            );
        case 'date':

            return (
                <FormGroup>
                    <Label for={name}>{label}</Label>
                    <div>
                        <DatePicker name={name}
                            dateFormat="dd/MM/yyyy"
                            selected={value ? value : new Date()}
                            onChange={(e) => onChange({ target: { value: e, name: name} })} 
                        />
                    </div>
                </FormGroup>
            );
        default:
            const { placeholder } = props;
            return (
                <FormGroup>
                    <Label for={name}>{label}</Label>
                    <Input  type={type} 
                            value={value}
                            name={name} 
                            id={name} 
                            placeholder={placeholder} 
                            onChange={onChange}
                    />
                </FormGroup>
            );
    }
}

export default FormC;