import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { TipoPagoData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const TipoPagos = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<TipoPagoData | null>(null);

	const { data, reloadFetchData } = useGetFetch<TipoPagoData>("/paymentType?isActive=true");
	const { postFetchData } = usePostFetch(
		"/paymentType/create",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de pago"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/paymentType",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de pago"
	);
	const { updateFetchData } = useUpdateFetch(
		"/paymentType",
		toast,
		updateModal,
		reloadFetchData,
		"Tipo de pago"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: TipoPagoData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de tipos de pago">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR TIPO DE PAGO"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar tipo de pago"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar tipo de pago"
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
	{ nombre: "Pago crédito", campo: "creditPayment" },
];
