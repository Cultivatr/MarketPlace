import React from "react";
import matchSorter from "match-sorter";
import ReactTable from "react-table";
import Class from "../../admin.module.css";
import "./ContainerDashboard.css";
import "react-table/react-table.css";

class DisplayAllDashboard extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    const { data } = this.props;
    return (
      <div className={Class.container2}>
        <div id="desktop-menu" className={Class.containerTitle}>
          <h4><p className="admin-main-p">{this.props.title}</p></h4>
        </div>
        <ReactTable
          data={data}
          noDataText="No items from producers!"
          defaultSorted={[{ id: "id", desc: true }]}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          columns={[
            {
              Header: "Click on Headers Below to Sort, or Type In Boxes Below to Filter Content",
              columns: [
                {
                  Header: "Order #",
                  accessor: "id",
                  width: 80,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["id"] }),
                  sortMethod: (a, b) => {
                    return (Number(a.substring(2)) > Number(b.substring(2))) ? 1 : -1
                  },
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "Farm",
                  accessor: "farm",
                  // width: 200,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["farm"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "Product",
                  id: "type",
                  // width: 80%,
                  accessor: d => d.type,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["type"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "Qty",
                  id: "quantity",
                  // width: 200,
                  accessor: d => d.quantity || d.estFinishedQty,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["quantity"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "Status",
                  id: "status",
                  // width: 340,
                  accessor: d => d.status,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["status"] }),
                  filterAll: true,
                  style: {
                    textAlign: "center"
                  }
                },
                {
                  Header: "",
                  id: "details",
                  width: 100,
                  accessor: d => (
                    <span
                      className="detail-button-container"
                      style={{
                        cursor: "pointer",
                        fontSize: 10,
                        border: "1px solid black",
                        borderRadius: "25px",
                        padding: "5px 5px",
                        margin: "3px 0px 3px 0px",
                        textAlign: "center",
                        userSelect: "none"
                      }}
                      id={d.id}
                      onClick={this.props.itemObj}
                    >
                      Details
                    </span>
                  )
                }
              ]
            }
          ]}
          defaultPageSize={20}
          className="-striped -highlight"
        // style={{
        //   height: "80vh"  // react table height set here

        // }}
        />
      </div>
    );
  }
}

export default DisplayAllDashboard;
