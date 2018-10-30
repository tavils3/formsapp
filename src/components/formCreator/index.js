import React, { Component } from 'react';
import Context from '../../context/';

class FormCreator extends Component {
    constructor() {
        super();
        this.idCounter = 0;
        this.state = {
            fields: {}
        }
    }
    
    resetFields() {
        this.setState({fields: {}});
    }
    
    addField(newFormData, el) {
        if (this.state.fields[el.name]) {
            return;
        }
        newFormData.push(el);
        let curState = this.state;
        curState.fields[el.name] = true;
        this.setState({curState});
    }
    
    renderButtons(data) {
        return data.fieldType.map((el, i) => {
            return <button className={`form-creator__button ${this.state.fields[el.name] ? 'form-creator__button_inactive' : ''}`} 
                    onClick={() => {this.addField(data.newFormData, el)}} 
                    key={this.idCounter++}>
                        {el.label}
                    </button>
        });
    }
    
    render() {
        return (
            <Context.Consumer>
                {
                    (context) => {
                        return (
                            <div className="forms-list__item form-creator">
                                {this.renderButtons(context)}
                                <button className="form-creator__button form-creator__button_create" onClick={() => {this.resetFields();context.addForm()}}>Создать форму</button>
                            </div>
                        )
                    }
                }
            </Context.Consumer>
        )
    }
}

export default FormCreator;