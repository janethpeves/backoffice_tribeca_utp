import React, { useEffect, useState } from "react";

import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { useGetFetch } from "@/hooks/useGetFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";

export const CitasAgendadas = () => {
	const { data, reloadFetchData } = useGetFetch<any>("/leads?procesosExcluir=Nuevo,Archivado");
	const [currentUpdateData, setCurrentUpdateData] = useState<any>(null);

	const { updateFetchData } = useUpdateFetch("/leads", "Lead", reloadFetchData);

	const onUpdate = (data: any) => {
		setCurrentUpdateData(data);
	};

	useEffect(() => {
		if (currentUpdateData) {
			const handleAgenda = async () => {
				try {
					const dataUpdate = {
						...currentUpdateData,
						proceso: "Realizado",
						fecha_proceso: new Date(),
					};
					await updateFetchData(currentUpdateData.id, dataUpdate);
					setCurrentUpdateData(null);
				} catch (error) {
					console.error(error);
				}
			};
			handleAgenda();
		}
	}, [currentUpdateData]);

	return (
		<>
			<MainContentStructure titleText="Seguimiento de Citas">
				<DataTable columns={columns} data={data} isExport={true} isSearch={true} onEye={onUpdate} />
			</MainContentStructure>
		</>
	);
};

const columns = [
	{ nombre: "Distrito", campo: "distrito" },
	{ nombre: "Proyecto", campo: "proyecto" },
	{ nombre: "Primer nombre", campo: "primer_nombre" },
	{ nombre: "Correo", campo: "correo" },
	{ nombre: "Teléfono", campo: "telefono" },
	{ nombre: "Proceso", campo: "proceso" },
	{ nombre: "Fecha del proceso", campo: "fecha_proceso" },
	{ nombre: "Mensaje del proceso", campo: "mensaje_proceso" },
];
