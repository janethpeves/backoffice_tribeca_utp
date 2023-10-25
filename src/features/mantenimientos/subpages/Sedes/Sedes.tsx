import React from "react";
import { useModal } from "@/hooks/useModal";

import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Sedes = () => {
	const addModal = useModal();

	return (
		<>
			<MainContentStructure titleText="Mantenimiento de sedes">
				<DataTable
					columns={columns}
					data={""}
					textAddButton="AGREGAR SEDE"
					onAddModal={addModal.onVisibleModal}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar sede"
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
	{ nombre: "Teléfono", campo: "phone" },
	{ nombre: "Departamento", campo: "department" },
	{ nombre: "Provincia", campo: "province" },
	{ nombre: "Distrito", campo: "district" },
	{ nombre: "Dirección", campo: "address" },
];
