import React, { useState } from "react";
import style from "./AddModal.module.css";

import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useEffect } from "react";
import { SwitchField } from "@/components/SwitchField/SwitchField";
import { SelectField } from "@/components/SelectField/SelectField";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newData, setNewData] = useState<any>({
		nombre: "",
		apellido_paterno: "",
		apellido_materno: "",
		email: "",
		rol: "",
		telefono: "",
		estado: true,
	});

	const handleSelectChange = (e: any) => {
		setNewData((prev: any) => ({
			...prev,
			rol: e.target.value,
		}));
	};

	const handleStatusChange = (e: any) => {
		setNewData((prev: any) => ({
			...prev,
			estado: !prev.estado,
		}));
	};

	const handleCreate = async () => {
		const dataCreate = { ...newData, rol: newData.rol?.nombre };
		postFetchData(dataCreate);
	};

	const handleUpdate = async () => {
		try {
			if (updateData) {
				const dataUpdate = { ...newData, rol: newData.rol?.nombre };
				await updateFetchData(updateData.id, dataUpdate);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (updateData) {
			setNewData(updateData);
		}
	}, [updateData]);

	return (
		<div className={style.column__container}>
			<TextBoxField
				textLabel="Nombre:"
				value={newData.nombre || ""}
				name="nombre"
				onChange={(e) => handleChangeInput(e, setNewData)}
				direction="row"
				labelWidth="120px"
			/>

			<TextBoxField
				textLabel="Apellido Paterno:"
				value={newData.apellido_paterno || ""}
				name="apellido_paterno"
				onChange={(e) => handleChangeInput(e, setNewData)}
				direction="row"
				labelWidth="120px"
			/>

			<TextBoxField
				textLabel="Apellido Materno:"
				value={newData.apellido_materno || ""}
				name="apellido_materno"
				onChange={(e) => handleChangeInput(e, setNewData)}
				direction="row"
				labelWidth="120px"
			/>

			<TextBoxField
				textLabel="Correo:"
				value={newData.email || ""}
				name="email"
				onChange={(e) => handleChangeInput(e, setNewData)}
				type="email"
				direction="row"
				labelWidth="120px"
			/>

			<TextBoxField
				textLabel="Password:"
				value={newData.password || ""}
				name="password"
				type="password"
				onChange={(e) => handleChangeInput(e, setNewData)}
				direction="row"
				labelWidth="120px"
			/>

			<SelectField
				textLabel="Rol:"
				value={newData.rol}
				name="rol"
				placeholder="Seleccione un rol"
				onChange={handleSelectChange}
				options={Roles}
				optionLabel="nombre"
				direction="row"
				labelWidth="120px"
			/>

			<TextBoxField
				textLabel="Teléfono:"
				value={newData.telefono || ""}
				name="telefono"
				type="number"
				onChange={(e) => handleChangeInput(e, setNewData)}
				direction="row"
				labelWidth="120px"
			/>

			<SwitchField
				textLabel="Habilitar:"
				value={newData.estado}
				name="estado"
				onChange={handleStatusChange}
				direction="row"
				labelWidth="120px"
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

const Roles = [
	{ id: 1, nombre: "Superadmin" },
	{ id: 2, nombre: "Admin" },
];
