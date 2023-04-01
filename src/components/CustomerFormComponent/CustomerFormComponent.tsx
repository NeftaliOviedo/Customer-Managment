import * as React from "react";
import {
  FormBuilder,
  AbstractControl,
  Validators,
  FormGroup,
  FormArray,
  FieldGroup,
  FieldControl,
  FieldArray,
} from "react-reactive-form";
import { Customer } from "../../interfaces/shared.interface";
import AddressFormComponent from "../AddressFormComponent/AddressFormComponent";

interface CustomerFormProps {
  onSubmit: (formValue: Customer) => void;
}

export default class CustomerFormComponent extends React.Component<CustomerFormProps> {
  constructor(props: CustomerFormProps) {
    super(props);
  }
  customerInfoForm = FormBuilder.group({
    id: [Math.random()],
    customerName: ["", Validators.required],
    customerLastName: ["", [Validators.required]],
    phone: ["", [Validators.required]],
    addresses: FormBuilder.array([]),
  });

  removeItem(index: number): void {
    const itemsControl = this.customerInfoForm.get("addresses") as FormArray;
    itemsControl.removeAt(index);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.props.onSubmit(this.customerInfoForm.value);
    this.handleReset();
  }

  handleReset() {
    this.customerInfoForm.reset();
    let formArray = this.customerInfoForm.get("addresses") as FormArray;
    while (formArray.length) {
      this.removeItem(0);
    }
  }

  render() {
    return (
      <FieldGroup
        control={this.customerInfoForm}
        render={({ value, pristine, invalid }) => (
          <div>
            <h2>Agregar cliente</h2>
            <form onSubmit={(e) => this.handleSubmit(e)} data-testid="customer-form">
              <FieldControl
                name="customerName"
                render={({ handler }: AbstractControl) => (
                  <div className="mb-3">
                    <label htmlFor="customerName" className="form-label">
                      Nombre:
                    </label>
                    <input
                      id="customerName"
                      name="customerName"
                      className="form-control"
                      {...handler()}
                    />
                  </div>
                )}
              />
              <FieldControl
                name="customerLastName"
                render={({ handler }: AbstractControl) => (
                  <div className="mb-3">
                    <label htmlFor="customerLastName" className="form-label">
                      Apellido:
                    </label>
                    <input
                      id="customerLastName"
                      name="customerLastName"
                      className="form-control"
                      {...handler()}
                    />
                  </div>
                )}
              />

              <FieldControl
                name="phone"
                render={({ handler }: AbstractControl) => (
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Telefono:
                    </label>
                    <input name="phone" id="phone" className="form-control" {...handler()} />
                  </div>
                )}
              />
              <AddressFormComponent
                customerInfoForm={this.customerInfoForm}
                removeItem={(idx) => this.removeItem(idx)}
              />
              <div>
                <button
                  disabled={pristine || invalid}
                  type="submit" 
                  data-testid="send-btn"
                  className="me-2 btn btn-primary"
                >
                  Enviar
                </button>
                <button data-testid="clean-btn" className=" btn btn-secondary" type="button" onClick={() => this.handleReset()}>
                  Limpiar
                </button>
              </div>
            </form>
          </div>
        )}
      />
    );
  }
}
