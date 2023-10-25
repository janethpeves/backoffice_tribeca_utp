import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { TipoSalidaData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const TipoSalida = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<TipoSalidaData | null>(null);

	const { data, reloadFetchData } = useGetFetch<TipoSalidaData>(
		"/Output-type?isActive=true&relations=true"
	);
	const { postFetchData } = usePostFetch(
		"/Output-type/create",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de salida"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/Output-type",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de salida"
	);
	const { updateFetchData } = useUpdateFetch(
		"/Output-type",
		toast,
		updateModal,
		reloadFetchData,
		"Tipo de salida"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: TipoSalidaData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de tipos de salida">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR TIPO DE SALIDA"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar tipo de salida"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar tipo de salida"
				modalStatus={updateModal.modalStatus}
				onHideModal={updateModal.onHideModal}
			>
				<AddModal updateFetchData={updateFetchData} updateData={currentUpdateData} />
			</PrimeModal>
		</>
	);
};

const columns = [
	{ nombre: "ID", campo: "id" },
	{ nombre: "Nombre", campo: "name" },
	{ nombre: "Nro. Correlativo", campo: "nro_correlative" },
	{ nombre: "Valorizado", campo: "valued" },
	{ nombre: "Precio de Venta", campo: "enableSalePrices" },
	{
		nombre: "Lista de precio",
		body: (rowData: any) => {
			return <>{rowData.priceType.name}</>;
		},
	},
];
