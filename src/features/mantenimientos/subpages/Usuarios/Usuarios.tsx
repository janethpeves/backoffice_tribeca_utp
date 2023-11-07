import React from "react";
import { useModal } from "@/hooks/useModal";

import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Usuarios = () => {
	const addModal = useModal();

	return (
		<>
			<MainContentStructure titleText="Mantenimiento de usuarios">
				<DataTable
					columns={columns}
					data={""}
					textAddButton="AGREGAR USUARIO"
					onAddModal={addModal.onVisibleModal}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar usuario"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={() => {}} />
			</PrimeModal>
		</>
	);
};

const columns = [
	// { nombre: "ID", campo: "id" },
	{ nombre: "Nombre", campo: "name" },
	{ nombre: "Apellido", campo: "name" },
	{
		nombre: "Teléfono",
		body: (rowData: any) => {
			return <>{rowData.phones[0]}</>;
		},
	},
	{ nombre: "Correo", campo: "ruc" },
	{ nombre: "Dirección", campo: "address" },
	{ nombre: "Cargo", campo: "address" },
	{ nombre: "Obs", campo: "address" },
	{
		nombre: "Habilitar",
		body: (rowData: any) => {
			return <>{rowData.phones[0]}</>;
		},
	},
];
