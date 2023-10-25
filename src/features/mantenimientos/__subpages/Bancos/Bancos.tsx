import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { BankDataProps } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Bancos = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<BankDataProps | null>(null);

	const { data, reloadFetchData } = useGetFetch<BankDataProps>("/banks?isActive=true");
	const { postFetchData } = usePostFetch(
		"/banks", // url conection
		toast, // toast reference
		addModal, //customHook modal
		reloadFetchData, // reload fetchGet
		"Banco" // Name section
	);
	const { deleteFetchData } = useDeleteFetch("/banks", toast, addModal, reloadFetchData, "Banco");
	const { updateFetchData } = useUpdateFetch(
		"/banks",
		toast,
		updateModal,
		reloadFetchData,
		"Banco"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: BankDataProps | null) => {
		let newData: any = { ...data, phone1: data?.phones[0], phone2: data?.phones[1] };
		setCurrentUpdateData(newData);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de usuarios">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR USUARIO"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar usuario"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar usuario"
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
	{ nombre: "DNI", campo: "ruc" },
	{ nombre: "Dirección", campo: "address" },
	{
		nombre: "Teléfono",
		body: (rowData: any) => {
			return <>{rowData.phones[0]}</>;
		},
	},
];
