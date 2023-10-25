import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { AlmacenesData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Almacenes = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<AlmacenesData | null>(null);

	const { data, reloadFetchData } = useGetFetch<AlmacenesData>("/warehouse?isActive=true");
	const { postFetchData } = usePostFetch("/warehouse", toast, addModal, reloadFetchData, "Almacén");
	const { deleteFetchData } = useDeleteFetch(
		"/warehouse",
		toast,
		addModal,
		reloadFetchData,
		"Almacén"
	);
	const { updateFetchData } = useUpdateFetch(
		"/warehouse",
		toast,
		updateModal,
		reloadFetchData,
		"Almacén"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: AlmacenesData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de almacén">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR ALMACÉN"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar almacén"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
				width={1000}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar almacén"
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
	// { nombre: "Distrito", campo: "district" },
	{ nombre: "Descripción", campo: "description" },
];
