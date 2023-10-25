import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { TipoIngresoData } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox"; //Funcion para hacer el cambio de estado de los inputs

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { CheckBoxField } from "@/components/CheckBoxField/CheckBoxField";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newData, setNewData] = useState<TipoIngresoData>({
		name: "",
		nro_correlative: "",
		valued: false,
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
			setNewData(updateData);
		}
	}, [updateData]);

	return (
		<div className={style.column__container}>
			<TextBoxField
				textLabel="Nombre"
				value={newData.name || ""}
				name="name"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="Nro. correlativo"
				value={newData.nro_correlative || ""}
				type="number"
				name="nro_correlative"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<CheckBoxField
				textLabel="Valorizado"
				value={newData.valued || false}
				name="valued"
				onChange={() => setNewData({ ...newData, valued: !newData.valued })}
			/>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR TIPO DE INGRESO
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR TIPO DE INGRESO
					</Button>
				</div>
			)}
		</div>
	);
};
