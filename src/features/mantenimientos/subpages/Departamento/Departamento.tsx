import React from "react";
import { useModal } from "@/hooks/useModal";

import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Departamento = () => {
	const addModal = useModal();

	return (
		<>
			<MainContentStructure titleText="Mantenimiento de departamento">
				<DataTable
					columns={columns}
					data={""}
					textAddButton="AGREGAR Departamento"
					onAddModal={addModal.onVisibleModal}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar departamento"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={() => {}} />
			</PrimeModal>
		</>
	);
};

const columns = [
	{ nombre: "ID", campo: "id" },
	{ nombre: "Nombre", campo: "name" },
	{ nombre: "Área", campo: "ruc" },
	{ nombre: "Cantidad dormitorio", campo: "address" },
    { nombre: "Cantidad baño", campo: "address" },
    { nombre: "Piso", campo: "address" },
];
