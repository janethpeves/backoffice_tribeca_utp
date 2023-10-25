import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { SubgrupoCategoriaData } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox"; //Funcion para hacer el cambio de estado de los inputs

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { SelectField } from "@/components/SelectField/SelectField";
import { useGetFetch } from "@/hooks/useGetFetch";
import { getFetch } from "@/helpers/getFetch";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const grupoData = useGetFetch<any>("/product/group?isActive=true");

	const [newData, setNewData] = useState<SubgrupoCategoriaData>({
		name: "",
		description: "",
		group: "",
		subGroup: "",
	});

	// Obteniendo datos para las opciones
	const [subGroupData, setSubGroupData] = useState([]);

	useEffect(() => {
		if (newData.group?.id) {
			getFetch(`/product/subgroup?isActive=true&productGroupId=${newData.group?.id}`)
				.then((data) => setSubGroupData(data))
				.catch((error) => console.error(error));
		}
	}, [newData.group]);

	const handleCreate = async () => {
		const { group, subGroup, ...restData } = newData;
		try {
			await postFetchData(restData, `subGroupId=${subGroup.id}`);
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdate = async () => {
		const { id, group, subGroup, ...restData } = newData;

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
				<>
					<SelectField
						textLabel="Grupo:"
						value={newData.group || undefined}
						name="group"
						onChange={(e) => handleChangeInput(e, setNewData)}
						options={grupoData.data}
					/>
					<SelectField
						textLabel="Subgrupo:"
						value={newData.subGroup || undefined}
						name="subGroup"
						onChange={(e) => handleChangeInput(e, setNewData)}
						options={subGroupData}
					/>
				</>
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
						AGREGAR SUBGRUPO CATEGORÍA
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR SUBGRUPO CATEGORÍA
					</Button>
				</div>
			)}
		</div>
	);
};
