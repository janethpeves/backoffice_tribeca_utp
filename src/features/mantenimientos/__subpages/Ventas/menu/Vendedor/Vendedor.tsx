import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { VendedorData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Vendedor = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<VendedorData | null>(null);

	const { data, reloadFetchData } = useGetFetch<VendedorData>(
		"/product/extra-category?isActive=true"
	);
	const { postFetchData } = usePostFetch(
		"/product/extra-category",
		toast,
		addModal,
		reloadFetchData,
		"Categoría extra"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/product/extra-category",
		toast,
		addModal,
		reloadFetchData,
		"Categoría extra"
	);
	const { updateFetchData } = useUpdateFetch(
		"/product/extra-category",
		toast,
		updateModal,
		reloadFetchData,
		"Categoría extra"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: VendedorData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de vendedor">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR VENDEDOR"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar vendedor"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar vendedor"
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
	{ nombre: "Dirección", campo: "address" },
	{ nombre: "R.U.C", campo: "ruc" },
	{ nombre: "Teléfono", campo: "phone" },
	{ nombre: "Clave deposito", campo: "password" },
];
