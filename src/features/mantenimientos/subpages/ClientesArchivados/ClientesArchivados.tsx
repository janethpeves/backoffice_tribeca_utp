import React from "react";

import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { useGetFetch } from "@/hooks/useGetFetch";
import { useExcelExport } from "@/hooks/useExcelExport";

export const ClientesArchivados = () => {
	const { exportToExcel } = useExcelExport();
	const { data, reloadFetchData } = useGetFetch<any>("/leads?proceso=Archivado");

	return (
		<>
			<MainContentStructure titleText="Clientes Archivados">
				<DataTable
					columns={columns}
					data={data}
					onExport={() => exportToExcel(data)}
					isSearch={true}
				/>
			</MainContentStructure>
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
