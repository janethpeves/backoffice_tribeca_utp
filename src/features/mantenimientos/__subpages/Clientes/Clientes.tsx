import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { Bank } from "./types";

import { Toast } from "primereact/toast";

import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Clientes = () => {
	const navigate = useNavigate();
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<Bank | null>(null);

	const { data, reloadFetchData } = useGetFetch<Bank>("/ubication/country?isActive=true");
	const { postFetchData } = usePostFetch(
		"/ubication/country",
		toast,
		addModal,
		reloadFetchData,
		"Pais"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/ubication/country",
		toast,
		addModal,
		reloadFetchData,
		"Pais"
	);
	const { updateFetchData } = useUpdateFetch(
		"/ubication/country",
		toast,
		updateModal,
		reloadFetchData,
		"Pais"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: Bank | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de cliente">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR CLIENTE"
					onAddModal={() => navigate("/mantenimientos/clientes/cliente")}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>
		</>
	);
};

const columns = [
	{ nombre: "ID", campo: "id" },
	{ nombre: "Nombre", campo: "name" },
	{ nombre: "Abreviatura", campo: "acronym" },
];
