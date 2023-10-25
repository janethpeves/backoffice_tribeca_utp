import React, { useState } from "react";
import style from "./AddModal.module.css";

import { handleChangeInput } from "@/helpers/handleTextBox"; //Funcion para hacer el cambio de estado de los inputs

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useEffect } from "react";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	// const [newBank, setNewBank] = useState<Bank>({
	// 	name: "",
	// 	address: "",
	// 	ruc: "",
	// 	phone1: "",
	// 	phone2: "",
	// });

	// const handleCreate = async () => {
	// 	// Estructurando la data para el envio del post
	// 	const { phone1, phone2, ...restData } = newBank;
	// 	const bankData: BankData = {
	// 		...restData,
	// 		phones: [phone1, phone2],
	// 	};
	// 	// Envio del post
	// 	try {
	// 		await postFetchData(bankData);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	// const handleUpdate = async () => {
	// 	const { id, phone1, phone2, ...restData } = newBank;
	// 	const bankData: BankData = {
	// 		...restData,
	// 		phones: [phone1, phone2],
	// 	};

	// 	try {
	// 		if (updateData) {
	// 			await updateFetchData(updateData.id, bankData);
	// 			console.log(bankData);
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	// Seteando el estado del input al data si existe el update
	// useEffect(() => {
	// 	if (updateData) {
	// 		setNewBank(updateData);
	// 	}
	// }, [updateData]);

	return (
		<div className={style.column__container}>
			{/* <TextBoxField
				textLabel="Nombre del banco"
				value={newBank.name || ""}
				name="name"
				onChange={(e) => handleChangeInput(e, setNewBank)}
			/>

			<TextBoxField
				textLabel="Dirección"
				value={newBank.address || ""}
				name="address"
				onChange={(e) => handleChangeInput(e, setNewBank)}
			/>

			<TextBoxField
				textLabel="R.U.C"
				value={newBank.ruc || ""}
				name="ruc"
				type="number"
				onChange={(e) => handleChangeInput(e, setNewBank)}
			/>

			<TextBoxField
				textLabel="Teléfono 1"
				value={newBank.phone1 || ""}
				name="phone1"
				type="number"
				onChange={(e) => handleChangeInput(e, setNewBank)}
			/>

			<TextBoxField
				textLabel="Teléfono 2"
				value={newBank.phone2 || ""}
				name="phone2"
				type="number"
				onChange={(e) => handleChangeInput(e, setNewBank)}
			/> */}

			{/* {postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR BANCO
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR BANCO
					</Button>
				</div>
			)} */}
		</div>
	);
};
