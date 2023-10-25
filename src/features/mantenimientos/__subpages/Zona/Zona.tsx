import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { ZoneData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Zona = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<ZoneData | null>(null);

	const { data, reloadFetchData } = useGetFetch<ZoneData>("/ubication/zone?isActive=true");
	const { postFetchData } = usePostFetch(
		"/ubication/zone",
		toast,
		addModal,
		reloadFetchData,
		"Zona"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/ubication/zone",
		toast,
		addModal,
		reloadFetchData,
		"Zona"
	);
	const { updateFetchData } = useUpdateFetch(
		"/ubication/zone",
		toast,
		updateModal,
		reloadFetchData,
		"Zona"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: ZoneData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de zona">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR ZONA"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar zona"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar zona"
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
	{ nombre: "Descripción", campo: "description" },
];
