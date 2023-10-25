import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { ImpuestoProductoData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const ImpuestosProducto = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<ImpuestoProductoData | null>(null);

	const { data, reloadFetchData } = useGetFetch<ImpuestoProductoData>(
		"/expense-type?isActive=true"
	);
	const { postFetchData } = usePostFetch(
		"/expense-type/create",
		toast,
		addModal,
		reloadFetchData,
		"Impuesto"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/expense-type",
		toast,
		addModal,
		reloadFetchData,
		"Impuesto"
	);
	const { updateFetchData } = useUpdateFetch(
		"/expense-type",
		toast,
		updateModal,
		reloadFetchData,
		"Impuesto"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: ImpuestoProductoData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure>
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR IMPUESTO"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar impuesto"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar impuesto"
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
