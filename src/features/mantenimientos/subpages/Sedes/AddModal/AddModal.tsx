import React, { useState } from "react";
import style from "./AddModal.module.css";

import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { SelectField } from "@/components/SelectField/SelectField";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newData, setNewData] = useState<any>({
		name: "",
		phone: "",
		department: "",
		province: "",
		district: "",
		address: "",
	});

	const handleCreate = async () => {
		console.log(newData);
	};

	return (
		<div className={style.column__container}>
			<TextBoxField
				textLabel="Nombre de la sede"
				value={newData.name || ""}
				name="name"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="Teléfono"
				value={newData.phone || ""}
				name="phone"
				type="number"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<SelectField
				textLabel="Departamento"
				value={newData.department || ""}
				name="department"
				onChange={(e) => handleChangeInput(e, setNewData)}
				placeholder="Seleccione un departamento"
				options={[]}
			/>
			<SelectField
				textLabel="Provincia"
				value={newData.province || ""}
				name="province"
				onChange={(e) => handleChangeInput(e, setNewData)}
				placeholder="Seleccione una provincia"
				options={[]}
			/>
			<SelectField
				textLabel="Distrito"
				value={newData.district || ""}
				name="district"
				onChange={(e) => handleChangeInput(e, setNewData)}
				placeholder="Seleccione un distrito"
				options={[]}
			/>

			<TextBoxField
				textLabel="Dirección"
				value={newData.address || ""}
				name="address"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR SEDE
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={() => {}}>
						EDITAR SEDE
					</Button>
				</div>
			)}
		</div>
	);
};
