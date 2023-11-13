import React from "react";
import { useModal } from "@/hooks/useModal";

import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { HeaderDataTable } from "@/components/HeaderDataTable/HeaderDataTable";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { useGetFetch } from "@/hooks/useGetFetch";

export const SeguimientoClientes = () => {
	const addModal = useModal();

	const { data, reloadFetchData } = useGetFetch<any>("/leads");

	return (
		<>
			<MainContentStructure titleText="Seguimiento de Clientes">
				<SectionStructure>
					<HeaderDataTable isExport isSearch />

					<DataTable
						columns={columns}
						data={data}
						onAddModal={addModal.onVisibleModal}
						isActionVerify={false}
					/>
				</SectionStructure>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar negocio aliado"
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
	{ nombre: "Distrito", campo: "distrito" },
	{ nombre: "Proyecto", campo: "proyecto" },
	{ nombre: "Primer nombre", campo: "primer_nombre" },
	{ nombre: "Segundo nombre", campo: "segundo_nombre" },
	{ nombre: "Correo", campo: "correo" },
	{ nombre: "Teléfono", campo: "telefono" },
	{ nombre: "Mensaje", campo: "mensaje" },
	{ nombre: "Fecha de Registro", campo: "fecha_registro" },
	{ nombre: "Obs", campo: "obs" },
];
