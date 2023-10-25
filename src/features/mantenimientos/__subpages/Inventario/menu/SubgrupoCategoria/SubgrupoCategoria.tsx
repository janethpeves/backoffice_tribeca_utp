import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { SubgrupoCategoriaData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const SubgrupoCategoria = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<SubgrupoCategoriaData | null>(null);

	const { data, reloadFetchData } = useGetFetch<SubgrupoCategoriaData>(
		"/product/subgroup-category?isActive=true"
	);
	const { postFetchData } = usePostFetch(
		"/product/subgroup-category",
		toast,
		addModal,
		reloadFetchData,
		"Subgrupo Categoria"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/product/subgroup-category",
		toast,
		addModal,
		reloadFetchData,
		"Subgrupo Categoria"
	);
	const { updateFetchData } = useUpdateFetch(
		"/product/subgroup-category",
		toast,
		updateModal,
		reloadFetchData,
		"Subgrupo Categoria"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: SubgrupoCategoriaData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de subgrupo categoría">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR SUBGRUPO CATEGORÍA"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar subgrupo categoría"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar subgrupo categoría"
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
