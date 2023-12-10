import React, { useEffect, useState } from "react";
import style from "./AddModal.module.css";

import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { Calendar } from "primereact/calendar";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newData, setNewData] = useState<any>({
		distrito: "",
		proyecto: "",
		primer_nombre: "",
		segundo_nombre: "",
		correo: "",
		telefono: "",
		mensaje: "",
		obs: "",
		fecha_registro: "",
		proceso: "",
		fecha_proceso: "",
		mensaje_proceso: "",
	});

	const handleAgenda = async () => {
		try {
			if (updateData) {
				const dataUpdate = { ...newData, proceso: "Agendado" };
				await updateFetchData(updateData.id, dataUpdate);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleArchivado = async () => {
		try {
			if (updateData) {
				const dataUpdate = { ...newData, proceso: "Archivado", fecha_proceso: new Date() };
				console.log(dataUpdate);
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
			<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
				<label>Fecha para agendar</label>
				<Calendar
					showIcon
					name="fecha_proceso"
					value={newData.fecha_proceso}
					onChange={(e: any) => handleChangeInput(e, setNewData)}
				/>
			</div>

			<TextBoxField
				textLabel="Mensaje del proceso"
				value={newData.mensaje_proceso || ""}
				name="mensaje_proceso"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			{updateFetchData && (
				<div style={{ display: "flex", gap: "20px" }}>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleAgenda}>
						AGENDAR LEAD
					</Button>
					<Button className="p-button-sm p-button-warning mr-2" onClick={handleArchivado}>
						ARCHIVAR LEAD
					</Button>
				</div>
			)}
		</div>
	);
};
