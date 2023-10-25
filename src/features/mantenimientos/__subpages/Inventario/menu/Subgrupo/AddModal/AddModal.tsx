import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { SubgrupoData } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox"; //Funcion para hacer el cambio de estado de los inputs

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { SelectField } from "@/components/SelectField/SelectField";
import { useGetFetch } from "@/hooks/useGetFetch";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const grupoData = useGetFetch<any>("/product/group?isActive=true");

	const [newData, setNewData] = useState<SubgrupoData>({
		name: "",
		description: "",
		groupId: "",
	});

	const handleCreate = async () => {
		const { groupId, ...restData } = newData;
		try {
			await postFetchData(restData, `groupId=${groupId.id}`);
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdate = async () => {
		const { id, groupId, ...restData } = newData;

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
			{!updateFetchData && (
				<SelectField
					textLabel="Grupo:"
					value={newData.groupId || undefined}
					name="groupId"
					onChange={(e) => handleChangeInput(e, setNewData)}
					options={grupoData.data}
				/>
			)}
			<TextBoxField
				textLabel="Nombre:"
				value={newData.name || ""}
				name="name"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="Descripción:"
				value={newData.description || ""}
				name="description"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR SUBGRUPO
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR SUBGRUPO
					</Button>
				</div>
			)}
		</div>
	);
};
