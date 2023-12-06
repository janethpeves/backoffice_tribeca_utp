import React, { useState } from "react";
import style from "./AddModal.module.css";

import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useEffect } from "react";
import { Calendar } from "primereact/calendar";

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
  const [newData, setNewData] = useState<any>({
    name: "",
    address: "",
    ruc: "",
    phone1: "",
    phone2: "",
    parametro: "",
  });

  const handleCreate = async () => {
    console.log(newData);
  };

  return (
    <div className={style.column__container}>
      <TextBoxField
        textLabel="Nombre de la oferta"
        value={newData.name || ""}
        name="name"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

      <TextBoxField
        textLabel="Descuento"
        value={newData.address || ""}
        name="address"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

      <div style={{ display: "flex", flexDirection:"column", gap: "5px" }}>
        <label >Fecha de inicio</label>
        <Calendar showIcon/>
      </div>

	  <div style={{ display: "flex", flexDirection:"column", gap: "5px" }}>
        <label >Fecha de fin</label>
        <Calendar showIcon/>
      </div>
    

      {postFetchData && (
        <div>
          <Button
            className="p-button-sm p-button-info mr-2"
            onClick={handleCreate}
          >
            AGREGAR PROMOCIÓN
          </Button>
        </div>
      )}

      {updateFetchData && (
        <div>
          <Button className="p-button-sm p-button-info mr-2" onClick={() => {}}>
            EDITAR PROMOCIÓN
          </Button>
        </div>
      )}
    </div>
  );
};
