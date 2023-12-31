import React from "react";
import { useModal } from "@/hooks/useModal";

import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const CategoriasProductos = () => {
	const addModal = useModal();

	return (
		<>
			<MainContentStructure titleText="Mantenimiento de categorias de productos">
				<DataTable
					columns={columns}
					data={""}
					textAddButton="AGREGAR CATEGORÍA DE PRODUCTOS"
					onAddModal={addModal.onVisibleModal}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar categoría de productos"
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
	// { nombre: "DNI", campo: "ruc" },
	// { nombre: "Dirección", campo: "address" },
	// {
	// 	nombre: "Teléfono",
	// 	body: (rowData: any) => {
	// 		return <>{rowData.phones[0]}</>;
	// 	},
	// },
];