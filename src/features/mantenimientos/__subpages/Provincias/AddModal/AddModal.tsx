import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { ProvinceData } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox";

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
	let countryData = useGetFetch("/ubication/country?isActive=true&relations=true");

	const [departmentData, setDepartmentData] = useState<any>([]);

	const [newData, setNewData] = useState<ProvinceData>({
		country: "",
		department: "",
		name: "",
		ubigeo: "",
	});

	// Obteniendo informacion de los departamentos que pertenecen a un country en especifico
	useEffect(() => {
		if (newData.country?.id) {
			getFetch(`/ubication/department?isActive=true&country_id=${newData.country?.id}`)
				.then((data) => setDepartmentData(data))
				.catch((error) => console.error(error));
		}
	}, [newData.country]);

	const handleCreate = async () => {
		const { country, department, ...restData } = newData;

		try {
			await postFetchData(restData, `department=${newData.department?.id}`);
		} catch (error) {
			console.log(error);
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
			{!updateData && (
				<>
					<SelectField
						textLabel="Seleccione un pais"
						value={newData.country || ""}
						name="country"
						onChange={(e) => handleChangeInput(e, setNewData)}
						placeholder="Seleccione un pais"
						options={countryData?.data}
					/>
					<SelectField
						textLabel="Seleccione un departamento"
						value={newData.department || ""}
						name="department"
						onChange={(e) => handleChangeInput(e, setNewData)}
						placeholder="Seleccione un departamento"
						options={departmentData}
					/>
				</>
			)}

			<TextBoxField
				textLabel="Nombre de la provincia"
				value={newData.name || ""}
				name="name"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="Código de ubigeo"
				value={newData.ubigeo || ""}
				name="ubigeo"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR PROVINCIA
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR PROVINCIA
					</Button>
				</div>
			)}
		</div>
	);
};
