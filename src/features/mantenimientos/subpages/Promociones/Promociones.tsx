import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";

import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";

export const Promociones = () => {
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<any>(null);

	const { data, reloadFetchData } = useGetFetch<any>("/oferta");
	const { postFetchData } = usePostFetch(
		"/oferta",
		"Oferta",
		reloadFetchData,
		addModal
	);
	const { deleteFetchData } = useDeleteFetch("/oferta", "Oferta", reloadFetchData);
	const { updateFetchData } = useUpdateFetch(
		"/oferta",
		"Oferta",
		reloadFetchData,
		updateModal
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: any) => {
		console.log(data);
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<MainContentStructure titleText="Mantenimiento de ofertas">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR OFERTA"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar oferta"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>
			{/* Update Modal */}
			<PrimeModal
				header="Editar oferta"
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
	{ nombre: "Descuento", campo: "name" },
	{ nombre: "Fecha inicio", campo: "address" },
	{ nombre: "Fecha fin", campo: "address" },
	
];