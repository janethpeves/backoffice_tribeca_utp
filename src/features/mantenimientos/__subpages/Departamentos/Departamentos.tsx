import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { Department } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Departamentos = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<Department | null>(null);

	const { data, reloadFetchData } = useGetFetch<Department>("/ubication/department?isActive=true");
	const { postFetchData } = usePostFetch(
		"/ubication/department",
		toast,
		addModal,
		reloadFetchData,
		"Departamento"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/ubication/department",
		toast,
		addModal,
		reloadFetchData,
		"Departamento"
	);
	const { updateFetchData } = useUpdateFetch(
		"/ubication/department",
		toast,
		updateModal,
		reloadFetchData,
		"Departamento"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: Department | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de departamento">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR DEPARTAMENTO"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar departamento"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar departamento"
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
