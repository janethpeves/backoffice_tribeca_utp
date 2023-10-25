import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { LocalesData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Locales = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<LocalesData | null>(null);

	const { data, reloadFetchData } = useGetFetch<LocalesData>("/local?isActive=true");
	const { postFetchData } = usePostFetch(
		"/local",
		toast,
		addModal,
		reloadFetchData,
		"Local"
	);
	const { deleteFetchData } = useDeleteFetch("/local", toast, addModal, reloadFetchData, "Local");
	const { updateFetchData } = useUpdateFetch(
		"/local",
		toast,
		updateModal,
		reloadFetchData,
		"Local"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: LocalesData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de local">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR LOCAL"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar local"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
				width={1000}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar local"
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
	// { nombre: "Departamento", campo: "department" },
	// { nombre: "Provincia", campo: "province" },
	// { nombre: "Distrito", campo: "district1" },
	{
		nombre: "Teléfono 1",
		body: (rowData: any) => {
			return <>{rowData.phones[0]}</>;
		},
	},
	{
		nombre: "Teléfono 2",
		body: (rowData: any) => {
			return <>{rowData.phones[1]}</>;
		},
	},
	{ nombre: "Cód. SUNAT", campo: "sunat" },
];

// - Código: Input
// - Descripción: Input
// - Dirección: Input
// - Departamento: Select
// - Provincia: Select
// - Distrito: Select
// - Teléfono 1: Input
// - Teléfono 2: Input
// - Cód. SUNAT: Input
