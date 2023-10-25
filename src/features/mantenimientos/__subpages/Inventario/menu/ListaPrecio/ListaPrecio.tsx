import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { ListaPrecioData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const ListaPrecio = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<ListaPrecioData | null>(null);

	const { data, reloadFetchData } = useGetFetch<ListaPrecioData>("/price-type?isActive=true");
	const { postFetchData } = usePostFetch(
		"/price-type/create",
		toast,
		addModal,
		reloadFetchData,
		"Lista de precio"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/price-type",
		toast,
		addModal,
		reloadFetchData,
		"Lista de precio"
	);
	const { updateFetchData } = useUpdateFetch(
		"/price-type",
		toast,
		updateModal,
		reloadFetchData,
		"Lista de precio"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: ListaPrecioData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de lista de precio">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR LISTA DE PRECIO"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar lista de precio"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar lista de precio"
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
];
