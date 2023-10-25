import React, { useState } from "react";
import style from "./AddModal.module.css";
import { TipoPagoData } from "../types";
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
	const [newData, setNewData] = useState<TipoPagoData>({
		name: "",
		creditPayment: false,
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
					textLabel="Nombre tipo de pago"
					value={newData.name || ""}
					name="name"
					onChange={(e) => handleChangeInput(e, setNewData)}
				/>

				<CheckBoxField
					textLabel="Pago crédito"
					value={newData.creditPayment}
					name="creditPayment"
					onChange={() => setNewData({ ...newData, creditPayment: !newData.creditPayment })}
				/>
			</div>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR TIPO DE PAGO
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR TIPO DE PAGO
					</Button>
				</div>
			)}
		</div>
	);
};
