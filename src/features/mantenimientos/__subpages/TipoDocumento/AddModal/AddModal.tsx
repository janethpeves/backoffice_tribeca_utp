import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { DocumentType } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";

import { CheckBoxField } from "@/components/CheckBoxField/CheckBoxField";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newData, setNewData] = useState<DocumentType>({
		name: "",
		abbreviation: "",
		business_doc: false,
		mtoMaximo: 0,
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
				textLabel="Abreviatura"
				value={newData.abbreviation || ""}
				name="abbreviation"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<CheckBoxField
				textLabel="Documento comercial"
				name="detractation"
				value={newData.business_doc}
				onChange={() => setNewData({ ...newData, business_doc: !newData.business_doc })}
			/>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR TIPO DE DOCUMENTO
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR TIPO DE DOCUMENTO
					</Button>
				</div>
			)}
		</div>
	);
};
