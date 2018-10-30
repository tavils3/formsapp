import React, { Component } from 'react';
import Context from '../../context/';

class InputBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            errorText: ''
        }
    }
    
    errorRender() {
        if (this.state.error) {
            return <div className="forms-list__item-error">{this.state.errorText}</div>
        } else {
            return <div className="forms-list__item-error"></div>
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <input 
                    type={this.props.fieldData.type}
                    className="forms-list__item-field"
                    placeholder={this.props.fieldData.label}
                    isrequired={this.props.fieldData.required}
                    name={this.props.fieldData.name}
                    defaultValue={this.props.formBlock.formData[this.props.fieldIndex].value}
                    onChange={(e) => { this.props.onChange(e.currentTarget.value, this, this.props.formBlock) }}
                />
                {this.errorRender()}
            </React.Fragment>
        )
    }
}

export default InputBlock;