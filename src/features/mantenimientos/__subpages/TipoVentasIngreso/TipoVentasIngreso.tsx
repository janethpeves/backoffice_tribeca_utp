import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { SalesType } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const TipoVentasIngreso = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<SalesType | null>(null);

	const { data, reloadFetchData } = useGetFetch<SalesType>("/sale-type-x-income?isActive=true");
	const { postFetchData } = usePostFetch(
		"/sale-type-x-income/create",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de ventas por ingreso"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/sale-type-x-income",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de ventas por ingreso"
	);
	const { updateFetchData } = useUpdateFetch(
		"/sale-type-x-income",
		toast,
		updateModal,
		reloadFetchData,
		"Tipo de ventas por ingreso"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: SalesType | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de tipos de ventas por ingreso">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR TIPO DE VENTAS POR INGRESO"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar tipo de ventas por ingreso"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar tipo de ventas por ingreso"
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
	{ nombre: "Valor", campo: "value" },
];
