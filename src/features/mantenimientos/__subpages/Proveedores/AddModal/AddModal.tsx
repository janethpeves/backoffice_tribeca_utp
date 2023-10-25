import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { ProviderData } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { CheckBoxField } from "@/components/CheckBoxField/CheckBoxField";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newData, setNewData] = useState<ProviderData>({
		name: "",
		ruc: "",
		address: "",
		phone1: "",
		phone2: "",
		fax: "",
		email: "",
		contact: "",
		providerType: undefined,
		isPnp: false,
	});

	const handleCreate = async () => {
		const { id, phone1, phone2, ...restData } = newData;
		let createData = { ...restData, phones: [phone1, phone2] };
		try {
			// console.log(createData);
			await postFetchData(createData);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async () => {
		const { id, phone1, phone2, ...restData } = newData;
		let updateData = { ...restData, phones: [phone1, phone2] };
		try {
			if (updateData) {
				await updateFetchData(newData.id, updateData);
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
			<div className={style.column}>
				<TextBoxField
					textLabel="Nombre"
					value={newData.name || ""}
					name="name"
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
					textLabel="Dirección"
					value={newData.address || ""}
					name="address"
					onChange={(e) => handleChangeInput(e, setNewData)}
				/>
				<TextBoxField
					textLabel="Teléfono 1"
					value={newData.phone1 || ""}
					name="phone1"
					onChange={(e) => handleChangeInput(e, setNewData)}
				/>
				<TextBoxField
					textLabel="Teléfono 2"
					value={newData.phone2 || ""}
					name="phone2"
					onChange={(e) => handleChangeInput(e, setNewData)}
				/>
			</div>
			<div className={style.column}>
				<TextBoxField
					textLabel="Fax"
					value={newData.fax || ""}
					name="fax"
					onChange={(e) => handleChangeInput(e, setNewData)}
				/>
				<TextBoxField
					textLabel="Correo electrónico"
					value={newData.email || ""}
					name="email"
					onChange={(e) => handleChangeInput(e, setNewData)}
				/>
				<TextBoxField
					textLabel="Contacto"
					value={newData.contact || ""}
					name="contact"
					onChange={(e) => handleChangeInput(e, setNewData)}
				/>
				<CheckBoxField
					textLabel="Proveedor PNP"
					name="providerPnp"
					value={newData.isPnp}
					onChange={() => setNewData({ ...newData, isPnp: !newData.isPnp })}
				/>
			</div>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR PROVEEDOR
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR PROVEEDOR
					</Button>
				</div>
			)}
		</div>
	);
};
