import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { ZoneData } from "../types";
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

	const [newData, setNewData] = useState<ZoneData>({
		name: "",
		description: "",
		country: "",
		department: "",
		province: "",
		district: "",
	});

	// Obteniendo datos para las opciones
	const [departmentData, setDepartmentData] = useState([]);
	const [provinceData, setProvinceData] = useState([]);
	const [districtData, setDistrictData] = useState([]);

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

	useEffect(() => {
		if (newData.province?.id) {
			getFetch(`/ubication/district?isActive=true&province_id=${newData.province?.id}`)
				.then((data) => setDistrictData(data))
				.catch((error) => console.error(error));
		}
	}, [newData.province]);

	const handleCreate = async () => {
		const { country, department, province, district, ...restData } = newData;

		try {
			await postFetchData(restData, `district_id=${newData.district?.id}`);
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
						options={countryData.data}
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
					<SelectField
						textLabel="Seleccione un distrito"
						value={newData.district || ""}
						name="district"
						onChange={(e) => handleChangeInput(e, setNewData)}
						placeholder="Seleccione una provincia"
						options={districtData}
					/>
				</>
			)}
			<TextBoxField
				textLabel="Nombre"
				value={newData.name || ""}
				name="name"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>
			<TextBoxField
				textLabel="Descripción"
				value={newData.description || ""}
				name="description"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR ZONA
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR ZONA
					</Button>
				</div>
			)}
		</div>
	);
};
