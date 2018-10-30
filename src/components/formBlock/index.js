import React, { Component } from 'react';
import Context from '../../context/';
import InputBlock from '../inputBlock';

class FormBlock extends Component {
    constructor(props) {
        super(props);
        this.formData = this.props.fields;
        this.idCounter = 0;
        this.state = {
            error: false,
            errorText: ''
        }
    }
    
    formRender() {
        return this.formData.map((el, i) => {
            return (
                <Context.Consumer key={this.idCounter++}>
                    {
                        (context) => {
                            return <InputBlock fieldData={el} fieldIndex={i} formBlock={this} onChange={context.fieldChangeHandler} key={this.idCounter++} />
                        }
                    }
                </Context.Consumer>
            )
        });
    }
    
    errorRender() {
        if (this.state.error) {
            return <div className="forms-list__item-error">{this.state.errorText}</div>;
        }
    }
    
    sendDataRender() {
        if (this.state.sendData !== '') {
            return <div className="forms-list__item-data">{this.state.sendData}</div>;
        }
    }
    
    render() {
        return (
            <Context.Consumer>
                {
                    (context) => {
                        return (
                            <form className="forms-list__item">
                                {this.formRender()}
                                <input type="submit" className="forms-list__item-button" onClick={(e) => {context.sendForm(e, this);}} />
                                {this.errorRender()}
                                {this.sendDataRender()}
                            </form>
                        )
                    }
                }
            </Context.Consumer>
        )
    }
}

export default FormBlock;