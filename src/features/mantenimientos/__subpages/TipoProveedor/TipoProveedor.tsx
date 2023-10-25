import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { ProviderType } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const TipoProveedor = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<ProviderType | null>(null);

	const { data, reloadFetchData } = useGetFetch<ProviderType>("/provider-type?isActive=true");
	const { postFetchData } = usePostFetch(
		"/provider-type",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de proveedor"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/provider-type",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de proveedor"
	);
	const { updateFetchData } = useUpdateFetch(
		"/provider-type",
		toast,
		updateModal,
		reloadFetchData,
		"Tipo de proveedor"
	);

	const onUpdate = (data: ProviderType | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de tipo de proveedor">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR TIPO DE PROVEEDOR"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar tipo de proveedor"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar tipo de proveedor"
				modalStatus={updateModal.modalStatus}
				onHideModal={updateModal.onHideModal}
			>
				<AddModal updateFetchData={updateFetchData} updateData={currentUpdateData} />
			</PrimeModal>
		</>
	);
};

const columns = [{ nombre: "Nombre", campo: "name" }];
