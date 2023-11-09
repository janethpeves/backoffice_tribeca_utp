import React, { useState } from "react";
import style from "./AddModal.module.css";

import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useEffect } from "react";
import { SelectField } from "@/components/SelectField/SelectField";
import { useGetFetch } from "@/hooks/useGetFetch";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	let proyectoData = useGetFetch("/proyectos");

	const [newData, setNewData] = useState<any>({
		nombre: "",
		area: "",
		cantidad_dormitorio: "",
		cantidad_banio: "",
		proyecto: "",
		obs: "",
	});

	const handleSelectChange = (e: any) => {
		setNewData((prev: any) => ({
			...prev,
			proyecto: e.target.value,
		}));
	};

	const handleCreate = async () => {
		const dataCreate = { ...newData, proyecto: newData.proyecto?.nombre };
		postFetchData(dataCreate);
	};

	const handleUpdate = async () => {
		try {
			if (updateData) {
				const dataUpdate = { ...newData, proyecto: newData.proyecto?.nombre };
				await updateFetchData(updateData.id, dataUpdate);
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
				value={newData.nombre || ""}
				name="nombre"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="Área"
				value={newData.area || ""}
				name="area"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="Cantidad de dormitorio"
				value={newData.cantidad_dormitorio || ""}
				name="cantidad_dormitorio"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>
			<TextBoxField
				textLabel="Cantidad de baño"
				value={newData.cantidad_banio || ""}
				name="cantidad_banio"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<SelectField
				textLabel="Proyecto"
				value={newData.proyecto}
				name="proyecto"
				placeholder="Elige un proyecto"
				optionLabel="nombre"
				onChange={handleSelectChange}
				options={proyectoData.data}
			/>

			<TextBoxField
				textLabel="Observación"
				value={newData.obs || ""}
				name="obs"
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
