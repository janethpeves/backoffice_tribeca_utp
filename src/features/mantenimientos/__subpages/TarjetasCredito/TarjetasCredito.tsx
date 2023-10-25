import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { CreditCard } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const TarjetasCredito = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<CreditCard | null>(null);

	const { data, reloadFetchData } = useGetFetch<CreditCard>("/credit-cards?isActive=true");
	const { postFetchData } = usePostFetch(
		"/credit-cards", // url conection
		toast, // toast reference
		addModal, //customHook modal
		reloadFetchData, // reload fetchGet
		"Tarjeta de crédito" // Name section
	);
	const { deleteFetchData } = useDeleteFetch(
		"/credit-cards",
		toast,
		addModal,
		reloadFetchData,
		"Tarjeta de crédito"
	);
	const { updateFetchData } = useUpdateFetch(
		"/credit-cards",
		toast,
		updateModal,
		reloadFetchData,
		"Tarjeta de crédito"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: CreditCard | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de tarjetas de crédito">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR TARJETA DE CRÉDITO"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar tarjeta de crédito"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar tarjeta de crédito"
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
	{ nombre: "Código POS", campo: "cod_pos" },
];
