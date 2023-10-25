import React, { useState } from "react";
import style from "./AddModal.module.css";
import { ExchangeRate } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { NumberBoxField } from "@/components/NumberBoxField/NumberBoxField";

interface PropsAddModal {
	postFetchData?: any;
}

export const AddModal = ({ postFetchData }: PropsAddModal) => {
	const [newData, setNewData] = useState<ExchangeRate>({
		date: "",
		amount: 0,
	});

	const handleCreate = async () => {
		let fecha = new Date();
		let data = { ...newData, date: fecha };
		try {
			await postFetchData(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={style.column__container}>
			<NumberBoxField
				textLabel="Cantidad"
				value={newData.amount || 0}
				name="amount"
				onChange={(e: any) => handleChangeInput(e, setNewData)}
			/>

			{/* Agregar opcion para booleano de Cta. Detraccion */}

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR TIPO DE CAMBIO
					</Button>
				</div>
			)}
		</div>
	);
};
