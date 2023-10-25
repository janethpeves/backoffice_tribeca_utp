import React, { useState } from "react";
import style from "./AddModal.module.css";

import { BankProps, BankDataProps } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useEffect } from "react";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newBank, setNewBank] = useState<BankProps>({
		name: "",
		address: "",
		ruc: "",
		phone1: "",
		phone2: "",
	});

	const handleCreate = async () => {
		// Estructurando la data para el envio del post
		const { phone1, phone2, ...restData } = newBank;
		const bankData: BankDataProps = {
			...restData,
			phones: [phone1, phone2],
		};
		// Envio del post
		try {
			await postFetchData(bankData);
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdate = async () => {
		const { id, phone1, phone2, ...restData } = newBank;
		const bankData: BankDataProps = {
			...restData,
			phones: [phone1, phone2],
		};

		try {
			if (updateData) {
				await updateFetchData(updateData.id, bankData);
				console.log(bankData);
			}
		} catch (error) {
			console.error(error);
		}
	};

	// Seteando el estado del input al data si existe el update
	useEffect(() => {
		if (updateData) {
			setNewBank(updateData);
		}
	}, [updateData]);

	return (
		<div className={style.column__container}>
			<TextBoxField
				textLabel="Nombre del usuario"
				value={newBank.name || ""}
				name="name"
				onChange={(e) => handleChangeInput(e, setNewBank)}
			/>

			<TextBoxField
				textLabel="DNI"
				value={newBank.address || ""}
				name="address"
				onChange={(e) => handleChangeInput(e, setNewBank)}
			/>

			<TextBoxField
				textLabel="Direccion"
				value={newBank.ruc || ""}
				name="ruc"
				type="number"
				onChange={(e) => handleChangeInput(e, setNewBank)}
			/>

			<TextBoxField
				textLabel="Teléfono"
				value={newBank.phone1 || ""}
				name="phone1"
				type="number"
				onChange={(e) => handleChangeInput(e, setNewBank)}
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
