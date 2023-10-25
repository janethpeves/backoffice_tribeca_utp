import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { TipoSalidaData } from "../types";
import { handleChangeInput } from "@/helpers/handleTextBox"; //Funcion para hacer el cambio de estado de los inputs

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { CheckBoxField } from "@/components/CheckBoxField/CheckBoxField";
import { SelectField } from "@/components/SelectField/SelectField";
import { getFetch } from "@/helpers/getFetch";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newData, setNewData] = useState<TipoSalidaData>({
		name: "",
		nro_correlative: "",
		valued: false,
		enableSalePrices: false,
		priceType: null,
	});

	const handleCreate = async () => {
		try {
			await postFetchData({ ...newData, priceType: newData.priceType?.id });
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdate = async () => {
		const { id, ...restData } = newData;

		// Envio del post
		try {
			await updateFetchData(updateData.id, { ...restData, priceType: restData.priceType?.id });
		} catch (error) {
			console.error(error);
		}
	};

	// Lista de precio para options select
	const [listaPrecioDataOptions, setListaPrecioDataOptions] = useState<any>([]);
	useEffect(() => {
		if (newData.enableSalePrices) {
			getFetch("/price-type?isActive=true")
				.then((data) => setListaPrecioDataOptions(data))
				.catch((error) => console.error(error));
		} else {
			setListaPrecioDataOptions([]);
		}
	}, [newData.enableSalePrices]);

	// Seteando el estado del input al data si existe el update
	useEffect(() => {
		if (updateData) {
			setNewData(updateData);
		}
	}, [updateData]);

	return (
		<div className={style.column__container}>
			<TextBoxField
				textLabel="Nombre"
				value={newData.name || ""}
				name="name"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="Nro. correlativo"
				value={newData.nro_correlative || ""}
				type="number"
				name="nro_correlative"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
				<CheckBoxField
					textLabel="Valorizado"
					value={newData.valued || false}
					name="valued"
					onChange={() => setNewData({ ...newData, valued: !newData.valued })}
				/>
				<CheckBoxField
					textLabel="Precio de venta"
					value={newData.enableSalePrices || false}
					name="enableSalePrices"
					onChange={() => setNewData({ ...newData, enableSalePrices: !newData.enableSalePrices })}
				/>
			</div>

			<SelectField
				textLabel="Lista de precio"
				placeholder="Selecciona una lista de precio"
				value={newData.priceType || undefined}
				name="priceType"
				onChange={(e) => handleChangeInput(e, setNewData)}
				options={listaPrecioDataOptions}
			/>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR TIPO DE SALIDA
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR TIPO DE SALIDA
					</Button>
				</div>
			)}
		</div>
	);
};
