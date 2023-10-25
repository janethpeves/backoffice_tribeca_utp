import React, { useState } from "react";
import style from "./AddModal.module.css";
import { AlmacenesData } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox"; //Funcion para hacer el cambio de estado de los inputs

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useEffect } from "react";
import { SelectField } from "@/components/SelectField/SelectField";
import { useGetFetch } from "@/hooks/useGetFetch";
import { getFetch } from "@/helpers/getFetch";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newData, setNewData] = useState<AlmacenesData>({
		name: "",
		address: "",
		department: undefined,
		province: undefined,
		district: undefined,
		description: "",
	});

	const handleCreate = async () => {
		// Estructurando la data para el envio del post
		const { department, province, ...restData } = newData;
		const localData: AlmacenesData = {
			...restData,
			district: newData.district.id,
		};
		// Envio del post
		try {
			await postFetchData(localData);
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdate = async () => {
		const { id, department, province, district, ...restData } = newData;
		// Envio del post
		try {
			await updateFetchData(updateData.id, restData);
		} catch (error) {
			console.error(error);
		}
	};

	// Cargando los datos para los selects
	const departmentData = useGetFetch<any>("/ubication/department?isActive=true&country_id=1");
	const [provinceData, setProvinceData] = useState<any>([]);
	const [districtData, setDistrictData] = useState<any>([]);
	const [zoneData, setZoneData] = useState<any>([]);

	useEffect(() => {
		if (newData.department?.id) {
			getFetch(`/ubication/province?isActive=true&department_id=${newData.department?.id}`)
				.then((data) => setProvinceData(data))
				.catch((error) => console.error(error));
		}
	}, [newData.department]);

	useEffect(() => {
		if (newData.province?.id) {
			getFetch(`/ubication/district?isActive=true&provinces_id=${newData.province?.id}`)
				.then((data) => setDistrictData(data))
				.catch((error) => console.error(error));
		}
	}, [newData.province]);

	useEffect(() => {
		if (newData.district?.id) {
			getFetch(`/ubication/zone?isActive=true&district_id=${newData.district?.id}`)
				.then((data) => setZoneData(data))
				.catch((error) => console.error(error));
		}
	}, [newData.district]);

	// Seteando el estado del input al data si existe el update
	useEffect(() => {
		if (updateData) {
			setNewData(updateData);
		}
	}, [updateData]);

	return (
		<div className={`${!updateData ? style.column__container : style.column__container__one}`}>
			<div className={style.column}>
				<TextBoxField
					textLabel="Nombre del almacén"
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
					textLabel="Descripción adicional"
					value={newData.description || ""}
					name="description"
					type="text"
					onChange={(e) => handleChangeInput(e, setNewData)}
				/>
			</div>

			{!updateData && (
				<div className={style.column}>
					<SelectField
						textLabel="Departamento"
						placeholder="Selecciona un departamento"
						value={newData.department || undefined}
						name="department"
						onChange={(e) => handleChangeInput(e, setNewData)}
						options={departmentData.data}
					/>
					<SelectField
						textLabel="Provincia"
						placeholder="Selecciona una provincia"
						value={newData.province || undefined}
						name="province"
						onChange={(e) => handleChangeInput(e, setNewData)}
						options={provinceData}
					/>
					<SelectField
						textLabel="Distrito"
						placeholder="Selecciona un distrito"
						value={newData.district || undefined}
						name="district"
						onChange={(e) => handleChangeInput(e, setNewData)}
						options={districtData}
					/>
				</div>
			)}

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR ALMACÉN
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR ALMACÉN
					</Button>
				</div>
			)}
		</div>
	);
};
