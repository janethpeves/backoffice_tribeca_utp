import { SelectField } from "@/components/SelectField/SelectField";
import { SwitchField } from "@/components/SwitchField/SwitchField";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { Button } from "primereact/button";
import React from "react";

interface PropsAddModal {
  postFetchData?: any;
  updateFetchData?: any;
  updateData?: any;
}

export const AddModal = ({
  postFetchData,
  updateFetchData,
  updateData,
}: PropsAddModal) => {
  return (
    <div>
      <TextBoxField
        textLabel="Producto:"
        value={""}
        name="name"
        onChange={() => console.log("Abre otro modal")}
      />
      <SelectField
        textLabel="Forma de pago:"
        value={""}
        name={""}
        onChange={() => ""}
        options={[]}
      />
      <SelectField
        textLabel="Tipo de rango:"
        value={""}
        name={""}
        onChange={() => ""}
        options={[]}
      />
      <TextBoxField
        textLabel="Rango inicial:"
        value={""}
        name="name"
        onChange={() => ""}
      />
      <TextBoxField
        textLabel="Rango final:"
        value={""}
        name="name"
        onChange={() => ""}
      />
      <SelectField
        textLabel="Método:"
        value={""}
        name={""}
        onChange={() => ""}
        options={[]}
      />
      <TextBoxField
        textLabel="Valor:"
        value={""}
        name="name"
        onChange={() => ""}
      />
      <SwitchField
        textLabel="Aplica Dscto auto."
        value={false}
        name=""
        onChange={()=>("")}
        direction="row"
      />

      <div>
        <Button className="p-button-sm p-button-info mr-2" onClick={() => ""}>
          AGREGAR DESCUENTOS ESPECIALES
        </Button>
      </div>

      {/* 
      {updateFetchData && (
        <div>
          <Button
            className="p-button-sm p-button-info mr-2"
            onClick={()=>("")}
          >
            EDITAR DESCUENTOS ESPECIALES
          </Button>
        </div>
      )} */}
    </div>
  );
};
