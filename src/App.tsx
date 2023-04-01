import React, { useState } from "react";
import FormComponent from "./components/CustomerFormComponent/CustomerFormComponent";
import TableComponent from "./components/TableComponent/TableComponent";
import { Customer } from "./interfaces/shared.interface";

export default class App extends React.Component<
  {},
  { customers: Customer[] }
> {
  /**
   *
   */
  constructor(props: {}) {
    super(props);

    this.state = {
      customers: [],
    };
  }

  handleSubmit(customer: Customer) {
    this.setState((prev) => ({
      customers: [...prev.customers, customer],
    }));
  }

  render(): React.ReactNode {
    return (
      <div className="m-4">
        <div className="row">
          <div className="col">
            <FormComponent
              onSubmit={(customer) => this.handleSubmit(customer)}
            />
          </div>
          <div className="col">
            {this.state.customers.length > 0 && (
              <TableComponent customers={this.state.customers} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
