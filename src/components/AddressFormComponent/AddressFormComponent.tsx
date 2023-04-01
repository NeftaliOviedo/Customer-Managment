import React from "react";
import {
  FieldArray,
  AbstractControl,
  FieldGroup,
  FieldControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from "react-reactive-form";
interface AddressFormProps {
  customerInfoForm: FormGroup;
  removeItem: (indx: number) => void;
}
export default class AddressFormComponent extends React.Component<
  AddressFormProps,
  {}
> {
  keyCount = 0;

  constructor(props: AddressFormProps) {
    super(props);
  }
  getKey = () => {
    return this.keyCount++;
  };
  addItem(): void {
    const itemsControl = this.props.customerInfoForm.get("addresses") as FormArray;
    itemsControl.push(this.createItem());
  }
  createItem(): FormGroup {
    const control = FormBuilder.group({
      street: "",
      state: "",
      city: "",
    });
    control.meta = {
      key: this.getKey(),
    };
    return control;
  }
  render() {
    return (
      <FieldArray
        name="addresses"
        render={({ controls }: any) => (
          <div>
            <div>
              <button data-testid="add-address-btn" type="button" className="btn btn-light" onClick={() => this.addItem()}>
                Agregar dirección
              </button>
            </div>
            <div className="m-5">

            <h4 >{controls.length ? "Direcciones:" : null}</h4>
            {controls.map((customerControl: AbstractControl, index: number) => (
              <div data-testid={`address-form-${index}`}  key={`${customerControl.meta.key}-${String(index)}`}>
                <FieldGroup
                  control={customerControl}
                  render={() => (
                    <div className="m-2">
                      <FieldControl
                        name="street"
                        render={({ handler }) => (
                          <div className="mb-3">
                            <label htmlFor="street" className="form-label">Calle:</label>
                            <input id="street" className="form-control"{...handler()} />
                          </div>
                        )}
                      />
                      <FieldControl
                        name="city"
                        render={({ handler }) => (
                          
                          <div className="mb-3">
                            
                            <label htmlFor="city" className="form-label">Ciudad:</label>
                            <input id="city" className="form-control" {...handler()} />
                          </div>
                        )}
                      />
                      <FieldControl
                        name="state"
                        render={({ handler }) => (
                          
                          <div className="mb-3">
                            
                            <label htmlFor="state" className="form-label">Provincia:</label>
                            <input id="state" className="form-control" {...handler()} />
                          </div>
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => this.props.removeItem(index)}
                        className="btn btn-danger"
                        data-testid={`remove-address-btn-${index}`}
                      >
                        {" "}
                        Eliminar esta dirección
                      </button>
                    </div>
                  )}
                />
              </div>
            ))}
            </div>

          </div>
        )}
      />
    );
  }
}
