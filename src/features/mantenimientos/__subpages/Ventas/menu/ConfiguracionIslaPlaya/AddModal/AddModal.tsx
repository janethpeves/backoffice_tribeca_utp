import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { ConfiguracionIslaPlayaData } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox"; //Funcion para hacer el cambio de estado de los inputs

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
  const [newData, setNewData] = useState<ConfiguracionIslaPlayaData>({
    lado: "",
    mang: "",
    codigo: "",
    producto: "",
    articulo: "",
  });
  console.log(newData);
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
        textLabel="Articulo"
        value={newData.articulo || ""}
        name="articulo"
        onChange={(e) => handleChangeInput(e, setNewData)}
        optionLabel={"descripcion"}
        options={optionArticulo}
      />

      <SelectField
        textLabel="Lado"
        value={newData.lado || ""}
        name="lado"
        onChange={(e) => handleChangeInput(e, setNewData)}
        options={optionLado}
      />

      <SelectField
        textLabel="Manguera"
        value={newData.mang || ""}
        name="mang"
        onChange={(e) => handleChangeInput(e, setNewData)}
        options={optionManguera}
      />
      {postFetchData && (
        <div>
          <Button
            className="p-button-sm p-button-info mr-2"
            onClick={handleCreate}
          >
            AGREGAR CONFIGURACIÓN ISLA PLAYA
          </Button>
        </div>
      )}

      {updateFetchData && (
        <div>
          <Button
            className="p-button-sm p-button-info mr-2"
            onClick={handleUpdate}
          >
            EDITAR CONFIGURACIÓN ISLA PLAYA
          </Button>
        </div>
      )}
    </div>
  );
};
const optionArticulo = [
  {
    codigo: "01",
    name: "GASOHOL 84",
    descripcion: "01 - GASOHOL 84",
  },
  {
    codigo: "02",
    name: "GASOHOL 90",
    descripcion: "02 - GASOHOL 90",
  },
  {
    codigo: "03",
    name: "GASOHOL 95",
    descripcion: "03 - GASOHOL 95",
  },
  {
    codigo: "04",
    name: "GASOHOL 97",
    descripcion: "04 - GASOHOL 97",
  },
  {
    codigo: "05",
    name: "DIESEL B5S50",
    descripcion: "05 - DIESEL B5S50",
  },
  {
    codigo: "06",
    name: "GAS LICUADO PETROLEO GLL",
    descripcion: "06 - GAS LICUADO PETROLEO GLL",
  },
  {
    codigo: "16",
    name: "GNV GAS NATURAL VEHICULAR",
    descripcion: "16 - GNV GAS NATURAL VEHICULAR",
  },
];

const optionLado = [
  { name: 1 },
  { name: 2 },
  { name: 3 },
  { name: 4 },
  { name: 5 },
  { name: 6 },
  { name: 7 },
  { name: 8 },
  { name: 9 },
  { name: 10 },
  { name: 11 },
  { name: 12 },
  { name: 13 },
  { name: 14 },
  { name: 15 },
  { name: 16 },
  { name: 17 },
  { name: 18 },
  { name: 19 },
  { name: 20 },
  { name: 21 },
  { name: 22 },
  { name: 23 },
  { name: 24 },
];
const optionManguera = [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }];
