import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { Department } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox";

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
	const country = useGetFetch("/ubication/country?isActive=true");

	const [newData, setNewData] = useState<Department>({
		country: "",
		name: "",
		ubigeo: "",
	});

	const handleCreate = async () => {
		const { country, ...restData } = newData;
		try {
			await postFetchData(restData, `country=${newData.country?.id}`);
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
			setNewData({ ...updateData });
		}
	}, [updateData]);

	return (
		<div className={style.column__container}>
			{!updateData && (
				<SelectField
					textLabel="Seleccione un pais"
					value={newData.country || ""}
					name="country"
					onChange={(e) => handleChangeInput(e, setNewData)}
					placeholder="Seleccione un pais"
					options={country?.data}
				/>
			)}

			<TextBoxField
				textLabel="Nombre del departamento"
				value={newData.name || ""}
				name="name"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="Código de ubigeo"
				value={newData.ubigeo || ""}
				name="ubigeo"
				type="number"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR DEPARTAMENTO
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR DEPARTAMENTO
					</Button>
				</div>
			)}
		</div>
	);
};
