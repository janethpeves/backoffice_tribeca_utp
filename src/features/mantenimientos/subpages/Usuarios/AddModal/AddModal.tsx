import React, { useState } from "react";
import style from "./AddModal.module.css";

import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useEffect } from "react";
import { SwitchField } from "@/components/SwitchField/SwitchField";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newData, setNewData] = useState<any>({
		name: "",
		address: "",
		dni: "",
		phone: "",
	});

	const handleCreate = async () => {
		// Estructurando la data para el envio del post
		console.log(newData);
	};

	const handleUpdate = async () => {
		console.log(newData);
	};

	return (
		<div className={style.column__container}>
			<TextBoxField
				textLabel="Nombre"
				value={newData.name || ""}
				name="name"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="DNI"
				value={newData.dni || ""}
				name="dni"
				type="number"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="Dirección"
				value={newData.address || ""}
				name="address"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="Teléfono"
				value={newData.phone || ""}
				name="phone1"
				type="number"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<SwitchField
			textLabel="Habilitar"
			value={false}
			name="switch"
			onChange={()=>("")}
			/>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR USUARIO
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR USUARIO
					</Button>
				</div>
			)}
		</div>
	);
};
