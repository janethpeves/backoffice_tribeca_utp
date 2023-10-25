import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { UnidadDeMedidaData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const UnidadMedida = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<UnidadDeMedidaData | null>(null);

	const { data, reloadFetchData } = useGetFetch<UnidadDeMedidaData>(
		"/measurement-unit?isActive=true"
	);
	const { postFetchData } = usePostFetch(
		"/measurement-unit/create",
		toast,
		addModal,
		reloadFetchData,
		"Unidad de medida"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/measurement-unit",
		toast,
		addModal,
		reloadFetchData,
		"Unidad de medida"
	);
	const { updateFetchData } = useUpdateFetch(
		"/measurement-unit",
		toast,
		updateModal,
		reloadFetchData,
		"Unidad de medida"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: UnidadDeMedidaData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de unidad de medida">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR UNIDAD DE MEDIDA"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar unidad de medida"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar unidad de medida"
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
	{ nombre: "Acrónimo", campo: "acronym" },
	{ nombre: "UN/ECE", campo: "un_ece" },
	{ nombre: "Nombre", campo: "name" },
	{ nombre: "Descripción", campo: "description" },
];
