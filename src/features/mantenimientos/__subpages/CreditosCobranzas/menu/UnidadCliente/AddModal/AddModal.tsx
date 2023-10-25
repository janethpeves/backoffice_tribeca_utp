import React, { useState } from "react";
import style from "./AddModal.module.css";
import { UnidadClienteData } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox"; //Funcion para hacer el cambio de estado de los inputs

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useEffect } from "react";

import { CheckBoxField } from "@/components/CheckBoxField/CheckBoxField";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newData, setNewData] = useState<UnidadClienteData>({
		name: "",
		isActive: true,
	});

	const handleCreate = async () => {
		// Envio del post
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
			<div className={style.column}>
				<TextBoxField
					textLabel="Nombre"
					value={newData.name || ""}
					name="name"
					onChange={(e) => handleChangeInput(e, setNewData)}
				/>
				<CheckBoxField
					textLabel="Activo"
					name="isActive"
					value={newData.isActive}
					onChange={() => setNewData({ ...newData, isActive: !newData.isActive })}
				/>
			</div>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR UNIDAD DE CLIENTE
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR UNIDAD DE CLIENTE
					</Button>
				</div>
			)}
		</div>
	);
};
