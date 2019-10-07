import React, { Component } from "react";
import "./TicketContainer.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

interface ticketState {
  seat: number[];
  row: number[];
  ticketPrice: number;
  tickets: number;
  totalAmount: number;
  allSelected: any[];
  databaseSelected: any[];
}

export default class TicketContainer extends Component<{}, ticketState> {
  constructor(props: any) {
    super(props);
    this.state = {
      seat: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25
      ],
      row: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      tickets: 0,
      totalAmount: 0,
      allSelected: [],
      databaseSelected: [{seat: 1, row: 3}, {seat: 19, row: 8}],
      ticketPrice: 115
    };
  }

  private handlePlus = () => {
    let prevState = this.state.tickets;
    if (this.state.tickets < 10) {
      this.setState({ tickets: prevState + 1 });
    }
  };

  private handleMinus = () => {
    if (this.state.tickets > 0) {
      let prevState = this.state.tickets;
      this.setState({ tickets: prevState - 1 });
    }
    if (this.state.tickets <= this.state.allSelected.length) {
      let tempArray = this.state.allSelected;
      tempArray.splice(this.state.tickets - 1, 1);
      this.setState({ allSelected: tempArray });
    }
  };

  render() {
    return (
      <div className="TicketContainer">
        <div className="TicketSelecter">
          <h5>Vælg antal billetter</h5>
          <div className="buttonTockle">
            <Button
              variant="danger"
              size="lg"
              onClick={this.handleMinus}
              active
            >
              -
            </Button>
            <div className="ticketValue">{this.state.tickets}</div>
            <Button variant="danger" size="lg" onClick={this.handlePlus} active>
              +
            </Button>
          </div>
          <div className="seatInfo">
            Følgende pladser er valgt:
            {this.state.allSelected ? (
              <React.Fragment>
                {this.state.allSelected.map((selected, index) => {
                  return (
                    <React.Fragment key={index}>
                      <br />
                      Række: {selected.row}, Sæde: {selected.seat}
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            ) : null}
          </div>
          <Card
            bg="light"
            style={{ width: "15rem", marginTop: "30px", color: "black" }}
          >
            <Card.Body>
              <Card.Title>
                <div className="totalContainer">
                  <div>
                    <strong>{this.state.tickets}</strong> billet(ter)
                  </div>
                  <div>
                    Total <strong>{this.state.tickets * this.state.ticketPrice}</strong> ,-
                  </div>
                </div>
              </Card.Title>
              <Card.Text>
                <Button
                  variant="success"
                  size="lg"
                  block
                  style={{ marginTop: "20px" }}
                >
                  Køb sæder
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="seats">
          {this.state.seat.map((seat, index) => {
            return (
              <div className="seat" key={index}>
                {this.state.row.map((row, index) => {
                  let bgColor =
                    this.state.allSelected.filter(
                      temp => temp.seat === seat && temp.row === row
                    ).length > 0
                      ? "#3368FF" : this.state.databaseSelected.filter(temp => temp.seat === seat && temp.row === row).length > 0 ? "#bd2130" : "#28a745";
                  return (
                    <div
                      className="row"
                      key={index}
                      style={{ background: bgColor }}
                      onClick={e => {
                        let newSelected = this.state.allSelected;
                        if (newSelected.length < this.state.tickets) {
                          if (
                            newSelected.filter(
                              temp => temp.seat === seat && temp.row === row
                            ).length === 0 && this.state.databaseSelected.filter(temp => temp.seat === seat && temp.row === row).length === 0
                          ) {
                            newSelected.push({ seat, row });
                            this.setState({ allSelected: newSelected });
                          }
                        }
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}