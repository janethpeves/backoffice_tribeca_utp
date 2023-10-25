import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { UnidadClienteData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const UnidadCliente = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<UnidadClienteData | null>(null);

	const { data, reloadFetchData } = useGetFetch<UnidadClienteData>("/credit-client-unit");
	const { postFetchData } = usePostFetch(
		"/credit-client-unit/create",
		toast,
		addModal,
		reloadFetchData,
		"Unidad de cliente"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/credit-client-unit",
		toast,
		addModal,
		reloadFetchData,
		"Unidad de cliente"
	);
	const { updateFetchData } = useUpdateFetch(
		"/credit-client-unit",
		toast,
		updateModal,
		reloadFetchData,
		"Unidad de cliente"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: UnidadClienteData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de unidad de cliente">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR UNIDAD DE CLIENTE"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar unidad de cliente"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar unidad de cliente"
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
	{ nombre: "Activo", campo: "isActive" },
];
