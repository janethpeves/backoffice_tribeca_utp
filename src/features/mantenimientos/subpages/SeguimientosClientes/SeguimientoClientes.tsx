import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";

import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { useGetFetch } from "@/hooks/useGetFetch";

import { useUpdateFetch } from "@/hooks/useUpdateFetch";

export const SeguimientoClientes = () => {
	const addModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<any>(null);

	const { data, reloadFetchData } = useGetFetch<any>("/leads?proceso=Nuevo");
	const { updateFetchData } = useUpdateFetch("/leads", "Lead", reloadFetchData, addModal);

	// Logica para el modal del update y sus datos

	const onUpdate = (data: any) => {
		setCurrentUpdateData(data);
		addModal.onVisibleModal();
	};

	return (
		<>
			<MainContentStructure titleText="Seguimiento de Clientes">
				<DataTable columns={columns} data={data} onEye={onUpdate} isExport={true} isSearch={true} />
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Procesar lead"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal updateFetchData={updateFetchData} updateData={currentUpdateData} />
			</PrimeModal>
		</>
	);
};

const columns = [
	{ nombre: "Distrito", campo: "distrito" },
	{ nombre: "Proyecto", campo: "proyecto" },
	{ nombre: "Primer nombre", campo: "primer_nombre" },
	{ nombre: "Segundo nombre", campo: "segundo_nombre" },
	{ nombre: "Correo", campo: "correo" },
	{ nombre: "Teléfono", campo: "telefono" },
	{ nombre: "Mensaje", campo: "mensaje" },
	{ nombre: "Fecha de Registro", campo: "fecha_registro" },
	{ nombre: "Proceso", campo: "proceso" },
];
