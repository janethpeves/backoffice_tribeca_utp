import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { DistrictsData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Distritos = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<DistrictsData | null>(null);

	const { data, reloadFetchData } = useGetFetch<DistrictsData>("/ubication/district?isActive=true");
	const { postFetchData } = usePostFetch(
		"/ubication/district",
		toast,
		addModal,
		reloadFetchData,
		"Distrito"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/ubication/district",
		toast,
		addModal,
		reloadFetchData,
		"Distrito"
	);
	const { updateFetchData } = useUpdateFetch(
		"/ubication/district",
		toast,
		updateModal,
		reloadFetchData,
		"Distrito"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: DistrictsData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de distrito">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR DISTRITO"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar distrito"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar distrito"
				modalStatus={updateModal.modalStatus}
				onHideModal={updateModal.onHideModal}
			>
				<AddModal updateFetchData={updateFetchData} updateData={currentUpdateData} />
			</PrimeModal>
		</>
	);
};

const columns = [
	{ nombre: "Nombre", campo: "name" },
	{ nombre: "Ubigeo", campo: "ubigeo" },
];
