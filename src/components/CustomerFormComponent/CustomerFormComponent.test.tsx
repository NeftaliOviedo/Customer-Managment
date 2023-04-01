import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CustomerFormComponent from "./CustomerFormComponent";
import "@testing-library/jest-dom";

describe("CustomerFormComponent", () => {
  it('should add a new address to the form when "Agregar dirección" button is clicked', () => {
    const { getByTestId } = render(
      <CustomerFormComponent onSubmit={() => {}} />
    );
    const addAddressBtn = getByTestId("add-address-btn");

    fireEvent.click(addAddressBtn);

    expect(getByTestId("address-form-0")).toBeInTheDocument();
  });

  it('should remove an address from the form when "Eliminar esta dirección" button is clicked', () => {
    const { getByTestId, queryByTestId } = render(
      <CustomerFormComponent onSubmit={() => {}} />
    );
    const addAddressBtn = getByTestId("add-address-btn");

    fireEvent.click(addAddressBtn);
    const removeAddressBtn = getByTestId("remove-address-btn-0");
    fireEvent.click(removeAddressBtn);

    expect(queryByTestId("address-form-0")).not.toBeInTheDocument();
  });

  it('should call "onSubmit" prop with form value when "Enviar" button is clicked', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(
      <CustomerFormComponent onSubmit={onSubmit} />
    );
    const form = getByTestId("customer-form");

    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      customerName: "",
      customerLastName: "",
      phone: "",
    });
  });

  it('should reset the form when "Limpiar" button is clicked', () => {
    const { getByTestId, queryByTestId } = render(
      <CustomerFormComponent onSubmit={() => {}} />
    );
    const limpiarBtn = getByTestId("clean-btn");

    fireEvent.click(limpiarBtn);

    expect(getByTestId("customer-form")).toHaveFormValues({
      customerName: "",
      customerLastName: "",
      phone: "",
    });
    expect(queryByTestId("address-form-0")).not.toBeInTheDocument();
  });
});
