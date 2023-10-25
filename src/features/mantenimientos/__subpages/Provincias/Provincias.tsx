import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { ProvinceData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Provincias = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<ProvinceData | null>(null);

	const { data, reloadFetchData } = useGetFetch<ProvinceData>("/ubication/province?isActive=true");
	const { postFetchData } = usePostFetch(
		"/ubication/province",
		toast,
		addModal,
		reloadFetchData,
		"Provincia"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/ubication/province",
		toast,
		addModal,
		reloadFetchData,
		"Provincia"
	);
	const { updateFetchData } = useUpdateFetch(
		"/ubication/province",
		toast,
		updateModal,
		reloadFetchData,
		"Provincia"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: ProvinceData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de provincia">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR PROVINCIA"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar provincia"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar provincia"
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
