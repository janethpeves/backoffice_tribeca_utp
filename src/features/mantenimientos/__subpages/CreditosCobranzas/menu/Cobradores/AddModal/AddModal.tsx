import React, { useState } from "react";
import style from "./AddModal.module.css";
import { CobradoresData } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox"; //Funcion para hacer el cambio de estado de los inputs

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useEffect } from "react";
import { SelectField } from "@/components/SelectField/SelectField";
import { CheckBoxField } from "@/components/CheckBoxField/CheckBoxField";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newData, setNewData] = useState<CobradoresData>({
		name: "",
		address: "",
		ruc: "",
		phone1: "",
		phone2: "",
	});

	const handleCreate = async () => {
		// Envio del post
		try {
			await postFetchData(newData);
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdate = async () => {
		const { id, ...restData } = newData;
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
			setNewData(updateData);
		}
	}, [updateData]);

	return (
		<div className={style.column__container}>
			<div className={style.column}>
				<TextBoxField
					textLabel="Nombre"
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
					textLabel="R.U.C"
					value={newData.ruc || ""}
					name="ruc"
					type="number"
					onChange={(e) => handleChangeInput(e, setNewData)}
				/>
			
				<TextBoxField
					textLabel="Teléfono 1"
					value={newData.phone1 || ""}
					name="phone1"
					type="number"
					onChange={(e) => handleChangeInput(e, setNewData)}
				/>
			
				<TextBoxField
					textLabel="Teléfono 2"
					value={newData.phone2 || ""}
					name="phone2"
					type="number"
					onChange={(e) => handleChangeInput(e, setNewData)}
				/>
			
			</div>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR COBRADOR
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR COBRADOR
					</Button>
				</div>
			)}
		</div>
	);
};
