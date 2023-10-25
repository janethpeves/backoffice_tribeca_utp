import React, { useState } from "react";
import style from "./AddModal.module.css";

import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newData, setNewData] = useState<any>({
		name: "",
	});

	const handleCreate = async () => {
		console.log(newData);
	};

	return (
		<div className={style.column__container}>
			<TextBoxField
				textLabel="Nombre de la categoria"
				value={newData.name || ""}
				name="name"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			
			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR CATEGORÍA
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={() => {}}>
						EDITAR CATEGORÍA
					</Button>
				</div>
			)}
		</div>
	);
};
