import React from "react";
import { useModal } from "@/hooks/useModal";

import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Tokens = () => {
	const addModal = useModal();

	return (
		<>
			<MainContentStructure titleText="Mantenimiento de tokens">
				<DataTable
					columns={columns}
					data={""}
					textAddButton="AGREGAR TOKENS"
					onAddModal={addModal.onVisibleModal}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar tokens"
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
	{ nombre: "Tipo", campo: "ruc" },
	{ nombre: "Porcentaje", campo: "address" },
	{ nombre: "Valor", campo: "" },
];