import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { CobradoresData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Cobradores = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<CobradoresData | null>(null);

	const { data, reloadFetchData } = useGetFetch<CobradoresData>("/collector?isActive=true");
	const { postFetchData } = usePostFetch(
		"/collector/create",
		toast,
		addModal,
		reloadFetchData,
		"Cobrador"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/collector",
		toast,
		addModal,
		reloadFetchData,
		"Cobrador"
	);
	const { updateFetchData } = useUpdateFetch(
		"/collector",
		toast,
		updateModal,
		reloadFetchData,
		"Cobrador"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: CobradoresData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de cobrador">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR COBRADOR"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar cobrador"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar cobrador"
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
	{ nombre: "R.U.C", campo: "ruc" },
	{ nombre: "Teléfono 1", campo: "phone1" },
	{ nombre: "Teléfono 2", campo: "phone2" },
];
