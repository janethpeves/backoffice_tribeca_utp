import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { ExpenseType } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const TipoGasto = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<ExpenseType | null>(null);

	const { data, reloadFetchData } = useGetFetch<ExpenseType>("/expense-type?isActive=true");
	const { postFetchData } = usePostFetch(
		"/expense-type/create",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de gasto"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/expense-type",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de gasto"
	);
	const { updateFetchData } = useUpdateFetch(
		"/expense-type",
		toast,
		updateModal,
		reloadFetchData,
		"Tipo de gasto"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: ExpenseType | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de tipo de gasto">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR TIPO DE GASTO"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar tipo de gasto"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar tipo de gasto"
				modalStatus={updateModal.modalStatus}
				onHideModal={updateModal.onHideModal}
			>
				<AddModal updateFetchData={updateFetchData} updateData={currentUpdateData} />
			</PrimeModal>
		</>
	);
};

const columns = [
	// { nombre: "ID", campo: "id" },
	{ nombre: "Nombre", campo: "name" },
];
