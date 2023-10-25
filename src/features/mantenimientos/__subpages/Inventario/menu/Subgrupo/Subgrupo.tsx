import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { SubgrupoData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Subgrupo = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<SubgrupoData | null>(null);

	const { data, reloadFetchData } = useGetFetch<SubgrupoData>("/product/subgroup?isActive=true");
	const { postFetchData } = usePostFetch(
		"/product/subgroup",
		toast,
		addModal,
		reloadFetchData,
		"Subgrupo"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/product/subgroup",
		toast,
		addModal,
		reloadFetchData,
		"Subgrupo"
	);
	const { updateFetchData } = useUpdateFetch(
		"/product/subgroup",
		toast,
		updateModal,
		reloadFetchData,
		"Subgrupo"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: SubgrupoData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de subgrupo">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR SUBGRUPO"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar subgrupo"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar subgrupo"
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
