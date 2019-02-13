import React, { Component } from 'react';
import './AddProduceForm.module.css';

class ProduceForm extends Component {  
    state = {
        data: {
            datePlanted: '',
            seedType: '',
            modifiedSeed: '',
            regNumber: '',
            heirloom: '',
            fertilizerTypeUsed: '',
            pesticideTypeUsed: '',
            estimatedFinishedQty: '',
            estPrice: '',
            qtyAcceptedForListing: '',
            qtyAcceptedAtDelivery: '',
            chargebacks: '',
            finalPricePaid: ''
        }
    }

    onChange = (e) => {
        let data = this.state.data;
        let newdata = { ...data, [e.target.name]: e.target.value }
        this.setState({ data: newdata })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.getFormData(this.state.data);
    }

    render() {
        return (
        <div className='ui grid container'>
            <form onSubmit={this.onSubmit} className='ui row form'>
                <div className='eight wide column'>
                    <div className="field">
                        <label>Date Planted</label>
                        <input onChange={this.onChange} type="text" name="datePlanted"/>
                    </div>
                    <div className="field">
                        <label>Seed Type</label>
                        <input onChange={this.onChange} type="text" name="seedType"/>
                    </div>
                    <div className='field'>
                        <label>Modified Seed</label>
                        <select onChange={this.onChange} name="modifiedSeed" multiple="" className="ui fluid dropdown">
                            <option value="">Please choose an option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className='field'>
                        <label>Hierloom</label>
                        <select onChange={this.onChange} name="hierloom" multiple="" className="ui fluid dropdown">
                            <option value="">Please choose an option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="field">
                        <label>Fertilizer Type Used</label>
                        <input onChange={this.onChange} type="text" name="fertilizerTypeUsed"/>
                    </div>
                    <div className="field">
                        <label>Pesticide Type Used</label>
                        <input onChange={this.onChange} type="text" name="pesticideTypeUsed"/>
                    </div>
                </div>
                <div className='eight wide column'>
                    <div className="field">
                        <label>Estimated Finished Qty</label>
                        <input onChange={this.onChange} type="text" name="estimatedFinishedQty"/>
                    </div>
                    <div className="field">
                        <label>Est Price</label>
                        <input onChange={this.onChange} type="text" name="estPrice"/>
                    </div>
                    <div className="field">
                        <label>Qty Accepted for Listing</label>
                        <input onChange={this.onChange} type="text" name="qtyAcceptedForListing"/>
                    </div>
                    <div className="field">
                        <label>Qty Accepted at Delivery</label>
                        <input onChange={this.onChange} type="text" name="qtyAcceptedAtDelivery"/>
                    </div>
                    <div className="field">
                        <label>Chargebacks</label>
                        <input onChange={this.onChange} type="text" name="chargebacks"/>
                    </div>
                    <div className="field">
                        <label>Final Price Paid</label>
                        <input onChange={this.onChange} type="number" name="finalPricePaid"/>
                    </div>
                </div>
            <button type="submit" className="ui button">Add</button>
            </form>
        </div>
        )
    }
}

export default ProduceForm;