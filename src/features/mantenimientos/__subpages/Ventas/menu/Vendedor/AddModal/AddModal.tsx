import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { VendedorData } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox"; //Funcion para hacer el cambio de estado de los inputs

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newData, setNewData] = useState<VendedorData>({
		name: "",
		address: "",
		ruc: "",
		phone: "",
		password: "",
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
			<TextBoxField
				textLabel="Nombre"
				value={newData.name || ""}
				name="name"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="Dirección"
				value={newData.address || ""}
				name="address"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>
			<TextBoxField
				textLabel="R.U.C"
				value={newData.ruc || ""}
				name="ruc"
				onChange={(e) => handleChangeInput(e, setNewData)}
				type="number"
			/>
			<TextBoxField
				textLabel="Teléfono"
				value={newData.phone || ""}
				name="phone"
				onChange={(e) => handleChangeInput(e, setNewData)}
				type="number"
			/>
			<TextBoxField
				textLabel="Clave deposito"
				value={newData.password || ""}
				name="password"
				onChange={(e) => handleChangeInput(e, setNewData)}
				type="password"
			/>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR VENDEDOR
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR VENDEDOR
					</Button>
				</div>
			)}
		</div>
	);
};
