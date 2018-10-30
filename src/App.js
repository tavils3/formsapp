import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Context from './context';
import FormBlock from './components/formBlock';
import FormCreator from './components/formCreator';

class App extends Component {
    constructor(props) {
        super(props);
        this.showItems = this.showItems.bind(this);
        this.addForm = this.addForm.bind(this);
        this.sendForm = this.sendForm.bind(this);
        this.fieldChangeHandler = this.fieldChangeHandler.bind(this);
        this.fieldType = [
            {
                type: 'text',
                label: 'Имя',
                name: 'fullName',
                required: 'true',
                value: ''
            },
            {
                type: 'text',
                name: 'birthDate',
                label: 'Дата рождения',
                required: 'true',
                validateType: 'date',
                value: ''
            }
        ];
        this.idCounter = 0;
        this.items = [<FormCreator key={this.idCounter++} />];
        this.newFormData = [];
    }
    
    addForm() {
        if (this.newFormData.length === 0) {
            return;
        }
        this.items.splice(-1, 0, <FormBlock key={this.idCounter++} formIndex={this.items.length - 1} fields={this.newFormData} />);
        this.newFormData = [];
        this.forceUpdate();
    }
    
    sendForm(e, formBlock) {
        e.preventDefault();
        let isValid = true;
        formBlock.formData.some((el, i) => {
            if (this.isFieldInCorrect(el)) {
                isValid = false;
            }
        });
        if (!isValid) {
            formBlock.setState({error: true, errorText: 'Форма заполнена неверно', sendData: ''});
        } else {
            let sendData = [];
            formBlock.formData.forEach((el, i) => {
                sendData.push({[el.label]: el.value});
            });
            formBlock.setState({error: false, errorText: '', sendData: JSON.stringify(sendData)});
        }
    }
    
    isValid(value, type) {
        switch (type) {
            case 'date':
                if (new Date(value) != 'Invalid Date') {
                    return true;
                } else {
                    return false;
                }
                break;
        }
    }
    
    showItems() {
        return this.items.map((item, i) => {
            return item;
        })
    }
    
    isFieldInCorrect(field) {
        if (field.value === '' && field.required === "true") {  
            return true;
        }
        if (field.validateType) {
            if (this.isValid(field, field.value)) {
                return true;
            }
        }
    }
    
    fieldChangeHandler(value, field, formBlock) {
        formBlock.formData[field.props.fieldIndex].value = value;
        if (value === '' && field.props.fieldData.required === "true") {  
            field.setState({error: true, errorText: 'Поле обязательно для заполнения', sendData: ''});
            return;
        }
        if (field.props.fieldData.validateType) {
            if (!this.isValid(value, field.props.fieldData.validateType)) {
                field.setState({error: true, errorText: 'Поле заполнено неверно', sendData: ''});
                return;
            }
        }
        field.setState({error: false, errorText: ''});
    }
  
    render() {
        let contextValue = {
            newFormData: this.newFormData,
            fieldType: this.fieldType,
            addForm: this.addForm,
            sendForm: this.sendForm,
            fieldChangeHandler: this.fieldChangeHandler
        }
        return (
            <Context.Provider value={contextValue}>
                <div className="forms-list">
                    {this.showItems()}
                </div>
            </Context.Provider>
        )
    }
}

export default App;
