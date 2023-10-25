import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { DistrictsData } from "../types";
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
	const country = useGetFetch<any>("/ubication/country?isActive=true");

	const [newData, setNewData] = useState<DistrictsData>({
		country: "",
		department: "",
		province: "",
		name: "",
		ubigeo: "",
	});

	// Obteniendo datos para las opciones
	const [departmentData, setDepartmentData] = useState([]);
	const [provinceData, setProvinceData] = useState([]);

	useEffect(() => {
		if (newData.country?.id) {
			getFetch(`/ubication/department?isActive=true&country_id=${newData.country?.id}`)
				.then((data) => setDepartmentData(data))
				.catch((error) => console.error(error));
		}
	}, [newData.country]);

	useEffect(() => {
		if (newData.department?.id) {
			getFetch(`/ubication/province?isActive=true&department_id=${newData.department?.id}`)
				.then((data) => setProvinceData(data))
				.catch((error) => console.error(error));
		}
	}, [newData.department]);

	const handleCreate = async () => {
		const { country, department, province, ...restData } = newData;

		try {
			await postFetchData(restData, `provinceId=${newData.province?.id}`);
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
						textLabel="Seleccione un país"
						value={newData.country || ""}
						name="country"
						onChange={(e) => handleChangeInput(e, setNewData)}
						placeholder="Seleccione un pais"
						options={country.data}
					/>
					<SelectField
						textLabel="Seleccione un departamento"
						value={newData.department || ""}
						name="department"
						onChange={(e) => handleChangeInput(e, setNewData)}
						placeholder="Seleccione un departamento"
						options={departmentData}
					/>
					<SelectField
						textLabel="Seleccione una provincia"
						value={newData.province || ""}
						name="province"
						onChange={(e) => handleChangeInput(e, setNewData)}
						placeholder="Seleccione una provincia"
						options={provinceData}
					/>
				</>
			)}

			<TextBoxField
				textLabel="Nombre del distrito"
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
						AGREGAR DISTRITO
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR DISTRITO
					</Button>
				</div>
			)}
		</div>
	);
};
