
import React, { Component } from "react";
import { refreshProduceItems, deleteProduceItem, addProduceItem } from "../../../SharedComponents/LocalServer/LocalServer";

export default class EditProduce extends Component {

  state = {
    newItem: "",
    produceSelection: "",
    refresh: "",
    status: "No Changes",
    lastAction: "",
    lastItem: "",
    currentLivestock: ""
  };
  produceSelection = [];
  errorMessage = "No Items in Database";


  populateItems = () => {
    if (this.state.produceSelection) {
      this.produceSelection = this.state.produceSelection.produce_items
        .map(value => {
          return value.newItem;
        })
        .sort()
        .map((value, index) => {
          return (
            <ProduceChartItem
              key={index}
              name={value}
              deleteProduceItemClick={this.deleteProduceItemClick}
            />
          );
        });
    }
  };

  refreshItems = async () => {
    const responseProduceItems = await refreshProduceItems();
    const json = await responseProduceItems.json();
    await this.setState({ produceSelection: json });
  }

  deleteItem = async itemToDelete => {
    await deleteProduceItem(itemToDelete)
      .catch(error => console.log(error));
    await this.refreshItems()
  };
  componentDidMount = async () => {
    await this.refreshItems();
    await this.populateItems();
    await this.setState({ refresh: "" });
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value
    }));
  };
  deleteProduceItemClick = async props => {
    const item = props.name;
    await this.deleteItem(item);
    await this.refreshItems();
    await this.populateItems();
    await this.setState({
      status: `${item} successfully removed from system`,
      lastItem: item,
      lastAction: "delete"
    });
  };
  undoAction = async () => {
    if (this.state.lastAction === "delete") {
      await this.setState({ newItem: this.state.lastItem });
      await this.addItem();
      await this.refreshItems();
      await this.populateItems();
      await this.setState({
        status: `Undo successful. ${this.state.newItem} re-added`,
        lastItem: this.state.newItem,
        lastAction: "add",
        newItem: ""
      });
    } else if (this.state.lastAction === "add") {
      await this.deleteItem(this.state.lastItem);
      await this.refreshItems();
      await this.populateItems();
      await this.setState({
        status: `Undo successful. ${this.state.lastItem} removed from system`,
        lastAction: "delete",
        newItem: ""
      });
    } else this.setState({ status: "Error" });
  };

  addItem = async () => {
    const { newItem } = this.state;
    await addProduceItem(newItem)
      .catch(error => console.log(error));
  };

  addClick = async e => {
    console.log("button clicked");
    const { newItem } = this.state;
    if (this.state.newItem) {
      await this.addItem();
      await this.refreshItems();
      await this.populateItems();
      await this.setState({
        status: `${newItem} successfully added`,
        lastAction: "add",
        lastItem: this.state.newItem,
        newItem: ""
      });
    } else this.setState({ status: "No item to add" });
  };
  render() {
    return (
      <div className="produce-container" >
        <div className="ui row form">
          <div className="field">
            <h4>Manage Available Produce Types</h4>
            <div className="undo-container">
              <div>Status: {this.state.status}</div>
              {this.state.status !== "No Changes" &&
                this.state.status !== "No item to add" && (
                  <div className="admin-btn undo-btn" onClick={this.undoAction}> Undo</div>
                )}
            </div>
            <div className="input-container">
              <input className="newProduceTypeInput"
                onChange={this.onChange}
                placeholder="Add New Produce Type to Dropdown"
                name="newItem"
                type="text"
                value={this.state.newItem}
              />
              <div onClick={this.addClick} className="admin-btn">Add</div></div>
          </div></div>
        <div className="produce-item-container">
          <strong>Current produce items available from dropdown:</strong>
          <div className="produce-item-list">
            <ul>
              {this.produceSelection !== false ? this.produceSelection : this.errorMessage}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}




const ProduceChartItem = props => {
  return (
    <li className="produce-select-item">
      <div>{props.name}</div>
      <div
        onClick={() => props.deleteProduceItemClick(props)}
        className="produce-delete-btn"
      >{`X`}
      </div>
    </li>
  );
};