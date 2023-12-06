import React, { useState } from "react";
import style from "./AddModal.module.css";

import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useEffect } from "react";
import { Calendar } from "primereact/calendar";
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
		precio_oferta: "",
		fecha_inicio: "",
		fecha_fin: "",
		obs: "",
		proyecto: "",
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

	useEffect(() => {
		if (updateData) {
			setNewData(updateData);
		}
	}, [updateData]);

	return (
		<div className={style.column__container}>
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
				textLabel="Nombre de la oferta"
				value={newData.nombre || ""}
				name="nombre"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="Precio de oferta"
				value={newData.precio_oferta || ""}
				name="precio_oferta"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
				<label>Fecha de inicio</label>
				<Calendar
					showIcon
					name="fecha_inicio"
					value={newData.fecha_inicio}
					onChange={(e: any) => handleChangeInput(e, setNewData)}
				/>
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
				<label>Fecha de fin</label>
				<Calendar
					showIcon
					name="fecha_fin"
					value={newData.fecha_fin}
					onChange={(e: any) => handleChangeInput(e, setNewData)}
				/>
			</div>

			<TextBoxField
				textLabel="Observación"
				value={newData.obs || ""}
				name="obs"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR OFERTA
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR OFERTA
					</Button>
				</div>
			)}
		</div>
	);
};
