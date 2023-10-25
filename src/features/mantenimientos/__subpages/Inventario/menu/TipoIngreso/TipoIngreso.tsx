import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { TipoIngresoData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const TipoIngreso = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<TipoIngresoData | null>(null);

	const { data, reloadFetchData } = useGetFetch<TipoIngresoData>("/income-type?isActive=true");
	const { postFetchData } = usePostFetch(
		"/income-type/create",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de ingreso"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/income-type",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de ingreso"
	);
	const { updateFetchData } = useUpdateFetch(
		"/income-type",
		toast,
		updateModal,
		reloadFetchData,
		"Tipo de ingreso"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: TipoIngresoData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de tipos de ingreso">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR TIPO DE INGRESO"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar tipo de ingreso"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar tipo de ingreso"
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
	{ nombre: "Nro. Correlativo", campo: "nro_correlative" },
	{ nombre: "Valorizado", campo: "valued" },
];
