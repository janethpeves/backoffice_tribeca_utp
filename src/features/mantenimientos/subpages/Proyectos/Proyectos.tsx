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

export const Proyectos = () => {
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<any>(null);

	const { data, reloadFetchData } = useGetFetch<any>("/proyectos");
	const { postFetchData } = usePostFetch("/proyectos", "Proyecto", reloadFetchData, addModal);
	const { deleteFetchData } = useDeleteFetch("/proyectos", "Proyecto", reloadFetchData);
	const { updateFetchData } = useUpdateFetch(
		"/proyectos",
		"Proyecto",
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
			<MainContentStructure titleText="Mantenimiento de proyectos">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR PROYECTO"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar proyecto"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Update Modal */}
			<PrimeModal
				header="Editar proyecto"
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
	{ nombre: "Nombre", campo: "nombre" },
	{ nombre: "Subtítulo", campo: "subtitulo" },
	// { nombre: "Estado", campo: "estado" },
	{ nombre: "Precio", campo: "precio" },
	{ nombre: "Cantidad dormitorio", campo: "cantidad_dormitorio" },
	{ nombre: "Cantidad de baños", campo: "cantidad_banio" },
	{ nombre: "Área", campo: "area" },
];
