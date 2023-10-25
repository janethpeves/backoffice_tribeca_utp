import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { PaisData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Pais = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<PaisData | null>(null);

	const { data, reloadFetchData } = useGetFetch<PaisData>("/ubication/country?isActive=true");
	const { postFetchData } = usePostFetch(
		"/ubication/country",
		toast,
		addModal,
		reloadFetchData,
		"Pais"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/ubication/country",
		toast,
		addModal,
		reloadFetchData,
		"Pais"
	);
	const { updateFetchData } = useUpdateFetch(
		"/ubication/country",
		toast,
		updateModal,
		reloadFetchData,
		"Pais"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: PaisData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de país">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR PAIS"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar pais"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar pais"
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
	{ nombre: "Abreviatura", campo: "acronym" },
];
