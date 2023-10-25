import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { PrecioPorClienteData } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox"; //Funcion para hacer el cambio de estado de los inputs

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { SelectField } from "@/components/SelectField/SelectField";
import { NumberBoxField } from "@/components/NumberBoxField/NumberBoxField";

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
  const [newData, setNewData] = useState<PrecioPorClienteData>({
    producto: "",
    tipocliente: "",
    tipodesc: "",
    precio: 0.0,
    contrato: "",
  });

  const handleCreate = async () => {
    try {
      await postFetchData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    const { id, ...restData } = newData;

    // Envio del post
    try {
      await updateFetchData(updateData.id, restData);
    } catch (error) {
      console.error(error);
    }
  };

  // Seteando el estado del input al data si existe el update
  useEffect(() => {
    if (updateData) {
      setNewData({ ...updateData });
    }
  }, [updateData]);

  return (
    <div className={style.column__container}>
      <SelectField
        textLabel="Producto"
        value={newData.producto || ""}
        name="producto"
        onChange={(e) => handleChangeInput(e, setNewData)}
        optionLabel={"description"}
        options={product_detalle}
      />

      <SelectField
        textLabel="Tipo Cliente"
        value={newData.tipocliente || ""}
        name="tipocliente"
        onChange={(e) => handleChangeInput(e, setNewData)}
        optionLabel={"description"}
        options={tipo_cliente}
      />

      <SelectField
        textLabel="Tipo Desc"
        value={newData.tipodesc || ""}
        name="tipodesc"
        onChange={(e) => handleChangeInput(e, setNewData)}
        optionLabel={"description"}
        options={tipo_desc}
      />
      <NumberBoxField
        textLabel="Precio"
        value={newData.precio || undefined}
        name="precio"
        onChange={(e: any) => handleChangeInput(e, setNewData)}
      />

      <TextBoxField
        textLabel="Contrato"
        value={newData.contrato || ""}
        name="contrato"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

      {postFetchData && (
        <div>
          <Button
            className="p-button-sm p-button-info mr-2"
            onClick={handleCreate}
          >
            AGREGAR PRECIO POR CLIENTE
          </Button>
        </div>
      )}

      {updateFetchData && (
        <div>
          <Button
            className="p-button-sm p-button-info mr-2"
            onClick={handleUpdate}
          >
            EDITAR PRECIO POR CLIENTE
          </Button>
        </div>
      )}
    </div>
  );
};
const product_detalle = [
  {
    codigo: "0000000015",
    name: "COCA COLA 1L",
    description: "0000000015 - COCA COLA 1L",
  },
  {
    codigo: "0000000027",
    name: "RUGOS DURAZNO 235 ML",
    description: "0000000027 - RUGOS DURAZNO 235 ML",
  },
  {
    codigo: "0000000028",
    name: "FRUGOS MANGO 235 ML",
    description: "0000000028 - FRUGOS MANGO 235 ML",
  },
  {
    codigo: "0000000029",
    name: "FRUGOS MANZANA 235 ML",
    description: "0000000029 - FRUGOS MANZANA 235 ML",
  },
  {
    codigo: "0000000030",
    name: "RUGOS NARANJA 235 ML",
    description: "0000000030 - RUGOS NARANJA 235 ML",
  },
];
const tipo_cliente = [
  {
    codigo: "CON",
    name: "CONTADO",
    description: "CON - CONTADO",
  },
  {
    codigo: "CRE",
    name: "CREDITO",
    description: "CRE - CREDITO",
  },
];
const tipo_desc = [
  {
    codigo: "DES",
    name: "MONTO DESC",
    description: "DES - MONTO DESC",
  },
  {
    codigo: "PRE",
    name: "PRECIO FIJO",
    description: "PRE - PRECIO FIJO",
  },
  {
    codigo: "REC",
    name: "MONTO RECARGO",
    description: "REC - MONTO RECARGO",
  },
];
