import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { AccountBank } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const CuentasBancarias = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<AccountBank | null>(null);

	const { data, reloadFetchData } = useGetFetch<AccountBank>("/bank-accounts?isActive=true");
	console.log(data);
	const { postFetchData } = usePostFetch(
		"/bank-accounts/create", // url conection
		toast, // toast reference
		addModal, //customHook modal
		reloadFetchData, // reload fetchGet
		"Cuenta bancaria" // Name section
	);
	const { deleteFetchData } = useDeleteFetch(
		"/bank-accounts",
		toast,
		addModal,
		reloadFetchData,
		"Cuenta bancaria"
	);
	const { updateFetchData } = useUpdateFetch(
		"/bank-accounts",
		toast,
		updateModal,
		reloadFetchData,
		"Cuenta bancaria"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: AccountBank | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de cuentas bancarias">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR CUENTA BANCARIA"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar cuenta bancaria"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar cuenta bancaria"
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
	{ nombre: "Nro. Cuenta", campo: "number" },
	// {
	// 	nombre: "Banco",
	// 	body: (rowData: any) => {
	// 		return <>{rowData.bank.currency.name}</>;
	// 	},
	// },
	// { nombre: "Tipo de moneda", campo: "currency" },
	// { nombre: "Tipo de cuenta", campo: "accountType" },
	// { nombre: "Cuenta de deducción", campo: "deductionAccount" },
	{ nombre: "Descripción", campo: "description" },
];
