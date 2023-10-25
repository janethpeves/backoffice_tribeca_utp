import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { ClientType } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const TipoCliente = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<ClientType | null>(null);

	const { data, reloadFetchData } = useGetFetch<ClientType>("/client-type?isActive=true");
	const { postFetchData } = usePostFetch(
		"/client-type",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de cliente"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/client-type",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de cliente"
	);
	const { updateFetchData } = useUpdateFetch(
		"/client-type",
		toast,
		updateModal,
		reloadFetchData,
		"Tipo de cliente"
	);

	const onUpdate = (data: ClientType | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de tipo de cliente">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR TIPO DE CLIENTE"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar tipo de cliente"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar tipo de cliente"
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
];
