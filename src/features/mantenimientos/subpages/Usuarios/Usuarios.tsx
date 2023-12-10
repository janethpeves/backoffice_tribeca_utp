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

export const Usuarios = () => {
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<any>(null);

	const { data, reloadFetchData } = useGetFetch<any>("/usuarios");
	const { postFetchData } = usePostFetch("/auth/registro", "Usuario", reloadFetchData, addModal);
	const { deleteFetchData } = useDeleteFetch("/usuarios", "Usuario", reloadFetchData);
	const { updateFetchData } = useUpdateFetch("/usuarios", "Usuario", reloadFetchData, updateModal);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: any) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
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

			{/* Update Modal */}
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
	{ nombre: "Nombre", campo: "nombre" },
	{ nombre: "Apellido Paterno", campo: "apellido_paterno" },
	{ nombre: "Apellido Materno", campo: "apellido_materno" },
	{ nombre: "Correo", campo: "email" },
	{ nombre: "Rol", campo: "rol" },
	{ nombre: "Teléfono", campo: "telefono" },
	{ nombre: "Activo", campo: "estado" },
];
