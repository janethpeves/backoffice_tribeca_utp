import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { ClientGroups } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const GrupoClientes = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<ClientGroups | null>(null);

	const { data, reloadFetchData } = useGetFetch<ClientGroups>("/client-group?isActive=true");
	const { postFetchData } = usePostFetch(
		"/client-group",
		toast,
		addModal,
		reloadFetchData,
		"Grupo de clientes"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/client-group",
		toast,
		addModal,
		reloadFetchData,
		"Grupo de clientes"
	);
	const { updateFetchData } = useUpdateFetch(
		"/client-group",
		toast,
		updateModal,
		reloadFetchData,
		"Grupo de clientes"
	);

	const onUpdate = (data: ClientGroups | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de grupo de clientes">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR GRUPO DE CLIENTES"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar grupo de clientes"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar grupo de clientes"
				modalStatus={updateModal.modalStatus}
				onHideModal={updateModal.onHideModal}
			>
				<AddModal updateFetchData={updateFetchData} updateData={currentUpdateData} />
			</PrimeModal>
		</>
	);
};

const columns = [{ nombre: "Nombre", campo: "name" }];
