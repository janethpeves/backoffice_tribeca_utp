import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { PerceptionType } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const TipoPercepcion = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<PerceptionType | null>(null);

	const { data, reloadFetchData } = useGetFetch<PerceptionType>("/perception-type");
	const { postFetchData } = usePostFetch(
		"/perception-type",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de percepción"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/perception-type",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de percepción"
	);
	const { updateFetchData } = useUpdateFetch(
		"/perception-type",
		toast,
		updateModal,
		reloadFetchData,
		"Tipo de percepción"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: PerceptionType | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de tipo de percepción">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR TIPO DE PERCEPCIÓN"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar tipo de percepción"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar tipo de percepción"
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
