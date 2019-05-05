import React, { Component, Fragment } from "react";
import "./AddProduceForm.module.css";
import "../../../../SharedComponents/UI/react-datepicker.css";
import Button from "../../../../SharedComponents/UI/Button";
import styles from "./AddProduceForm.module.css";
import Toolbar from "../../../../SharedComponents/Navigation/Toolbar/Toolbar";
import DatePicker from "react-datepicker";
import "../../../../SharedComponents/miscStyles.css";

const domainLink = "https://hidden-escarpment-75213.herokuapp.com/";
// const domainLink2 = "http://localhost:5000/";
class ProduceForm extends Component {
  // There are items in this class that are not being used. Removing them will cause DB errors. Attention Byron!!!!!!!!!!!!!!
  state = {
    data: {
      type: "",
      packageType: "",
      packageSize: 0,
      packageSizeUnit: "",
      estCompletionDate: "0001-01-01",
      seedType: "",
      modifiedSeed: false,
      heirloom: false,
      fertilizerTypeUsed: "",
      pesticideTypeUsed: "",
      estQuantityPlanted: 0,
      certifiedOrganic: false,
      estFinishedQty: 0,
      estPrice: 0,
      qtyAcceptedForListing: 0,
      qtyAcceptedAtDelivery: 0,
      chargebacks: 0,
      finalPricePaid: 0,
      deliveredTo: "",
      deliveredDate: "0001-01-01",
      comments: "",
      status: "Pending Admin"
    },
    produceListItems: [],
    addedThisSession: 0
  };

  componentWillMount = async () => {
    const responseProduceItems = await fetch(domainLink + `produceItems/all/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const json = await responseProduceItems.json();
    const pItems = json;
    if (pItems) {
      var pList = document.getElementById("produceItems1");
      await pItems.produce_items.forEach(item => {
        let indiv = item.newItem;
        let element = document.createElement("option");
        element.textContent = indiv;
        element.value = indiv;
        pList.appendChild(element);
      });
    }
  };

  onChange = e => {
    let data = this.state.data;
    let newdata = { ...data, [e.target.name]: e.target.value };
    this.setState({ data: newdata });
    console.log("Data", newdata);
  };
  onCompDateChange = date => {
    this.setState({ estCompletionDate: date });
  };

  onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const {
      type,
      packageType,
      packageSize,
      packageSizeUnit,
      seedType,
      modifiedSeed,
      heirloom,
      fertilizerTypeUsed,
      pesticideTypeUsed,
      estQuantityPlanted,
      certifiedOrganic,
      estFinishedQty,
      estPrice,
      qtyAcceptedForListing,
      qtyAcceptedAtDelivery,
      chargebacks,
      finalPricePaid,
      deliveredTo,
      deliveredDate,
      comments,
      status
    } = this.state.data;
    const estCompletionDate = this.state.estCompletionDate;
    console.log("INCOMING DATA: ", this.state.data);

    document.getElementById("submitBtn").className += " loading";
    fetch(domainLink + "produce/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userId: JSON.parse(sessionStorage.getItem("authData")).id,
        type: type,
        packageType: packageType,
        packageSize: packageSize,
        packageSizeUnit: packageSizeUnit,
        estCompletionDate: estCompletionDate,
        seedType: seedType,
        modifiedSeed: modifiedSeed,
        heirloom: heirloom,
        fertilizerTypeUsed: fertilizerTypeUsed,
        pesticideTypeUsed: pesticideTypeUsed,
        estQuantityPlanted: estQuantityPlanted,
        certifiedOrganic: certifiedOrganic,
        estFinishedQty: estFinishedQty,
        estPrice: estPrice,
        qtyAcceptedForListing: qtyAcceptedForListing,
        qtyAcceptedAtDelivery: qtyAcceptedAtDelivery,
        chargebacks: chargebacks,
        finalPricePaid: finalPricePaid,
        deliveredTo: deliveredTo,
        deliveredDate: deliveredDate,
        comments: comments,
        status: status
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .then(form.reset())
      .then(
        setTimeout(function() {
          document.getElementById("submitBtn").className = "ui button";
        }, 1000)
      )
      .catch(error => console.log(error));
    this.setState({ addedThisSession: this.state.addedThisSession + 1 });
  };

  render() {
    return (
      <Fragment>
        <Toolbar />
        <h2>Add Produce</h2>
        <div className={styles.wrapper}>
          <content
            style={{
              width: 15,
              height: 15,
              borderRadius: 150 / 2,
              backgroundColor: "#1ECE88",
              position: "relative",
              top: "0px",
              left: "100px"
            }}
          >
            Coloured Border Indicates Required Field
          </content>
          <div className="ui grid container">
            <form onSubmit={this.onSubmit} className="ui row form">
              <div className="eight wide column">
                <div className="field">
                  <label>Type</label>
                  <select
                    onChange={this.onChange}
                    type="text"
                    name="type"
                    id="produceItems1"
                    style={{ border: "3px solid #1ECE88" }}
                  >
                    <option>Select Produce Item</option>
                  </select>
                </div>
                <div className="field">
                  <label>Package Type</label>
                  <select
                    onChange={this.onChange}
                    name="packageType"
                    multiple=""
                    className="ui fluid dropdown"
                    style={{ border: "3px solid #1ECE88" }}
                  >
                    <option value="">Please choose an option</option>
                    <option value="Bunch">Bunch</option>
                    <option value="Head">Head</option>
                    <option value="Bag">Bag</option>
                  </select>
                </div>
                <div className="field size-container">
                  <label>Package Size</label>
                  <div className="qty-container">
                    <input
                      onChange={this.onChange}
                      type="text"
                      name="packageSize"
                      className="qty-form"
                    />
                    <select
                      onChange={this.onChange}
                      name="packageSizeUnit"
                      multiple=""
                      className="ui fluid dropdown qty-dropdown"
                    >
                      <option value="Pounds">Pounds</option>
                      <option value="Grams">Grams</option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label>Est Completion Date</label>
                  <div
                    className="dpicker"
                    style={{ border: "3px solid #1ECE88", width: "150px" }}
                  >
                    <DatePicker
                      name="estCompletionDate"
                      onChange={this.onCompDateChange}
                      dateFormat="YYYY-MM-dd"
                      selected={this.state.estCompletionDate}
                    />
                  </div>
                </div>
                <div className="field">
                  <label>Seed Type</label>
                  <input onChange={this.onChange} type="text" name="seedType" />
                </div>
                <div className="field">
                  <label>Modified Seed</label>
                  <select
                    onChange={this.onChange}
                    name="modifiedSeed"
                    multiple=""
                    className="ui fluid dropdown"
                  >
                    <option value="">Please choose an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="field">
                  <label>Heirloom</label>
                  <select
                    onChange={this.onChange}
                    name="heirloom"
                    multiple=""
                    className="ui fluid dropdown"
                  >
                    <option value="">Please choose an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="field">
                  <label>Comments</label>
                  <textarea
                    onChange={this.onChange}
                    placeholder="Tell us more"
                    rows="3"
                    name="comments"
                  />
                </div>
              </div>
              <div className="eight wide column">
                <div className="field">
                  <label>Estimated Quantity Planted</label>
                  <input
                    onChange={this.onChange}
                    type="number"
                    name="estQuantityPlanted"
                  />
                </div>
                <div className="field">
                  <label>Certified Organic</label>
                  <select
                    onChange={this.onChange}
                    name="certifiedOrganic"
                    multiple=""
                    className="ui fluid dropdown"
                  >
                    <option value="">Please choose an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="field">
                  <label>Estimated Finished Qty</label>
                  <input
                    onChange={this.onChange}
                    type="number"
                    name="estFinishedQty"
                    style={{ border: "3px solid #1ECE88" }}
                  />
                </div>
                <div className="field">
                  <label>Fertilizer Type Used</label>
                  <input
                    onChange={this.onChange}
                    type="text"
                    name="fertilizerTypeUsed"
                  />
                </div>
                <div className="field">
                  <label>Pesticide Type Used</label>
                  <input
                    onChange={this.onChange}
                    type="text"
                    name="pesticideTypeUsed"
                  />
                </div>
                <input
                  onChange={this.onChange}
                  type="hidden"
                  id="userId"
                  name="userId"
                  value="1"
                />
              </div>
              <Button>Add</Button>
            </form>
            <strong>
              {" "}
              # of Produce Items Added: {this.state.addedThisSession}
            </strong>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ProduceForm;
