import React from "react";
import { useModal } from "@/hooks/useModal";

import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Monedas = () => {
	const addModal = useModal();

	return (
		<>
			<MainContentStructure titleText="Mantenimiento de monedas">
				<DataTable
					columns={columns}
					data={""}
					textAddButton="AGREGAR MONEDAS"
					onAddModal={addModal.onVisibleModal}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar monedas"
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
	{ nombre: "Abreviatura", campo: "ruc" },
	// { nombre: "Dirección", campo: "address" },
	// {
	// 	nombre: "Teléfono",
	// 	body: (rowData: any) => {
	// 		return <>{rowData.phones[0]}</>;
	// 	},
	// },
];