import React from "react";
import { Customer } from "../../interfaces/shared.interface";

const TableComponent: React.FC<{ customers: Customer[] }> = ({ customers }) => {
  return (
    <>
    <h2 >Listado de clientes</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>Nombre</td>

            <td>Apellido</td>

            <td>Telefono</td>

            <td>Direcciones</td>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.customerName}</td>
              <td>{customer.customerLastName}</td>
              <td>{customer.phone}</td>
              <td>
                {customer.addresses.map((address,idx) => (
                  <>
                    <span
                      key={address.id}
                    >{`#${idx+1}: ${address.street}, ${address.city}, ${address.state}`}</span>
                    <br />
                  </>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableComponent;
