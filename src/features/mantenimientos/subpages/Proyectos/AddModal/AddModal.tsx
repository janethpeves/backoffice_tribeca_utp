import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";

import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { SelectField } from "@/components/SelectField/SelectField";

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
    nombre: "",
    subtitulo: "",
    descripcion: "",
    precio: "",
    cantidad_dormitorio: "",
    cantidad_banio: "",
    area: "",
    pisos: "",
    estado: "",
  });

  const handleSelectChange = (e: any) => {
    setNewData((prev: any) => ({
      ...prev,
      estado: e.target.value,
    }));
  };

  const handleCreate = async () => {
    const dataCreate = { ...newData, estado: newData.estado?.name };
    postFetchData(dataCreate);
  };

  const handleUpdate = async () => {
    try {
      if (updateData) {
        const dataUpdate = { ...newData, estado: newData.estado?.name };
        await updateFetchData(updateData.id, dataUpdate);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Seteando el estado del input al data si existe el update
  useEffect(() => {
    if (updateData) {
      setNewData(updateData);
    }
  }, [updateData]);

  return (
    <div className={style.column__container}>
      <TextBoxField
        textLabel="Nombre del proyecto"
        value={newData.nombre || ""}
        name="nombre"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

      <TextBoxField
        textLabel="Subtítulo"
        value={newData.subtitulo || ""}
        name="subtitulo"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

      <TextBoxField
        textLabel="Descripción"
        value={newData.descripcion || ""}
        name="descripcion"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />
      <TextBoxField
        textLabel="Precio"
        value={newData.precio || ""}
        name="precio"
        type="number"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />
      <TextBoxField
        textLabel="Cantidad dormitorio"
        value={newData.cantidad_dormitorio || ""}
        name="cantidad_dormitorio"
        type="number"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

      <TextBoxField
        textLabel="Cantidad de baños"
        value={newData.cantidad_banio || ""}
        name="cantidad_banio"
        type="number"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />
      <TextBoxField
        textLabel="Área"
        value={newData.area || ""}
        name="area"
        type="number"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />
      <TextBoxField
        textLabel="Pisos"
        value={newData.pisos || ""}
        name="pisos"
        type="number"
        onChange={(e) => handleChangeInput(e, setNewData)}
      />

      <SelectField
        textLabel="Estado del proyecto"
        value={newData.estado}
        name="estado"
        placeholder="Elige un estado del proyecto"
        optionLabel="name"
        onChange={handleSelectChange}
        options={estadoData}
      />

      {postFetchData && (
        <div>
          <Button
            className="p-button-sm p-button-info mr-2"
            onClick={handleCreate}
          >
            AGREGAR PROYECTO
          </Button>
        </div>
      )}

      {updateFetchData && (
        <div>
          <Button
            className="p-button-sm p-button-info mr-2"
            onClick={handleUpdate}
          >
            EDITAR PROYECTO
          </Button>
        </div>
      )}
    </div>
  );
};

const estadoData = [
  { id: 1, name: "Proximamente" },
  { id: 2, name: "En construcción" },
  { id: 3, name: "Venta inmediata" },
];
