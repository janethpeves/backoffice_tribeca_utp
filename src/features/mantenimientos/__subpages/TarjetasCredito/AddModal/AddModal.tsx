import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { CreditCard } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newData, setNewData] = useState<CreditCard>({
		name: "",
		cod_pos: "",
		cCuenta: "",
	});

	const handleCreate = async () => {
		try {
			await postFetchData(newData);
		} catch (error) {
			console.log(error);
		}
		console.log(newData);
	};

	const handleUpdate = async () => {
		const { id, ...restData } = newData;
		try {
			if (updateData) {
				await updateFetchData(updateData.id, restData);
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
				textLabel="Nombre"
				value={newData.name || ""}
				name="name"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="Código POS"
				value={newData.cod_pos || ""}
				name="cod_pos"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			{/* Agregar opcion para booleano de Cta. Detraccion */}

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR TARJETA DE CRÉDITO
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR TARJETA DE CRÉDITO
					</Button>
				</div>
			)}
		</div>
	);
};
