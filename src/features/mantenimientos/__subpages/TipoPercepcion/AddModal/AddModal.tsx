import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { PerceptionType } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { NumberBoxField } from "@/components/NumberBoxField/NumberBoxField";
import { CheckBoxField } from "@/components/CheckBoxField/CheckBoxField";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newData, setNewData] = useState<PerceptionType>({
		name: "",
		rate: 0,
		isActive: true,
	});

	const handleCreate = async () => {
		const { isActive, ...restData } = newData;
		try {
			await postFetchData(restData);
		} catch (error) {
			console.error(error);
		}
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
			<NumberBoxField
				textLabel="Tasa"
				value={newData.rate || 0}
				name="rate"
				onChange={(e: any) => handleChangeInput(e, setNewData)}
			/>

			{updateFetchData && (
				<CheckBoxField
					textLabel="Mostrar"
					name="show"
					value={newData.isActive}
					onChange={() => setNewData({ ...newData, isActive: !newData.isActive })}
				/>
			)}

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR TIPO DE PERCEPCIÓN
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR TIPO DE PERCEPCIÓN
					</Button>
				</div>
			)}
		</div>
	);
};
