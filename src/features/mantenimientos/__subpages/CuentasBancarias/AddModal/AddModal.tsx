import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { AccountBank } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox"; //Funcion para hacer el cambio de estado de los inputs

import { useGetFetch } from "@/hooks/useGetFetch";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { SelectField } from "@/components/SelectField/SelectField";
import { CheckBoxField } from "@/components/CheckBoxField/CheckBoxField";
import { BankProps } from "../../Bancos/types";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	let banks = useGetFetch<BankProps>("/banks?isActive=true");
	let currency = useGetFetch<BankProps>("/currency?isActive=true");

	const [newData, setNewData] = useState<AccountBank>({
		detractation: false,
		currency: null,
		number: "",
		description: "",
		bank: null,
	});

	const handleCreate = async () => {
		try {
			await postFetchData({ ...newData, bank: newData.bank?.id, currency: newData.currency?.id });
		} catch (error) {
			console.log(error);
		}
		console.log(newData);
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
				textLabel="Número de cuenta"
				value={newData.number || ""}
				name="number"
				type="number"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<SelectField
				textLabel="Banco"
				value={newData.bank || ""}
				name="bank"
				onChange={(e) => handleChangeInput(e, setNewData)}
				placeholder="Seleccione un banco"
				options={banks.data}
			/>

			<SelectField
				textLabel="Tipo de moneda"
				value={newData.currency || ""}
				name="currency"
				onChange={(e) => handleChangeInput(e, setNewData)}
				placeholder="Seleccione un tipo de moneda"
				options={currency.data}
			/>

			<TextBoxField
				textLabel="Descripción"
				value={newData.description || ""}
				name="description"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<CheckBoxField
				textLabel="Cta. Detracción"
				name="detractation"
				value={newData.detractation}
				onChange={() => setNewData({ ...newData, detractation: !newData.detractation })}
			/>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR CUENTA BANCARIA
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={() => console.log(newData)}>
						EDITAR CUENTA BANCARIA
					</Button>
				</div>
			)}
		</div>
	);
};
