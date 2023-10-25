import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { CategoriaData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Grupo = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<CategoriaData | null>(null);

	const { data, reloadFetchData } = useGetFetch<CategoriaData>("/product/group?isActive=true");
	const { postFetchData } = usePostFetch(
		"/product/group",
		toast,
		addModal,
		reloadFetchData,
		"Grupo"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/product/group",
		toast,
		addModal,
		reloadFetchData,
		"Grupo"
	);
	const { updateFetchData } = useUpdateFetch(
		"/product/group",
		toast,
		updateModal,
		reloadFetchData,
		"Grupo"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: CategoriaData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de grupo">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR GRUPO"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar grupo"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar grupo"
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
	{ nombre: "Descripción", campo: "description" },
];
