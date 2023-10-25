import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { DetractionType } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const TipoDetraccion = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<DetractionType | null>(null);

	const { data, reloadFetchData } = useGetFetch<DetractionType>("/detraction-type");
	const { postFetchData } = usePostFetch(
		"/detraction-type",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de detracción"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/detraction-type",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de detracción"
	);
	const { updateFetchData } = useUpdateFetch(
		"/detraction-type",
		toast,
		updateModal,
		reloadFetchData,
		"Tipo de detracción"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: DetractionType | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de tipo de detracción">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR TIPO DE DETRACCIÓN"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar tipo de detracción"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar tipo de detracción"
				modalStatus={updateModal.modalStatus}
				onHideModal={updateModal.onHideModal}
			>
				<AddModal updateFetchData={updateFetchData} updateData={currentUpdateData} />
			</PrimeModal>
		</>
	);
};

const columns = [
	// { nombre: "ID", campo: "id" },
	{ nombre: "Nombre", campo: "name" },
	{ nombre: "Tasa", campo: "rate" },
	{ nombre: "Mostrar", campo: "isActive" },
];
