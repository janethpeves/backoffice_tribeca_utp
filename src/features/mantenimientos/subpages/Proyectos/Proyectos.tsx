import React from "react";
import { useModal } from "@/hooks/useModal";

import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Proyectos = () => {
    const addModal = useModal();

	return (
		<>
			<MainContentStructure titleText="Mantenimiento de proyectos">
				<DataTable
					columns={columns}
					data={""}
					textAddButton="AGREGAR PROYECTO"
					onAddModal={addModal.onVisibleModal}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar proyecto"
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
	{ nombre: "Subtítulo", campo: "phone" },
	{ nombre: "Estado", campo: "department" },
	{ nombre: "Precio", campo: "province" },
	{ nombre: "Cantidad dormitorio", campo: "district" },
	{ nombre: "Cantidad de baños", campo: "address" },
    { nombre: "Área", campo: "address" },
];

