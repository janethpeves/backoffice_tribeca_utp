import React, { useRef } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { ExchangeRate } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const TipoCambio = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();

	const { data, reloadFetchData } = useGetFetch<ExchangeRate>("/exchange-rate?isActive=true");
	const { postFetchData } = usePostFetch(
		"/exchange-rate/create",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de cambio"
	);

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de tipos de cambio">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR TIPO DE CAMBIO"
					onAddModal={addModal.onVisibleModal}
					isActionVerify={false}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar tipo de cambio"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>
		</>
	);
};

const columns = [
	// { nombre: "ID", campo: "id" },
	{
		nombre: "Fecha",
		body: (rowData: any) => {
			const dateData = new Date(rowData.date);
			const fullDate = dateData.toLocaleDateString("es-ES", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
			return <>{fullDate}</>;
		},
	},
	{
		nombre: "Hora",
		body: (rowData: any) => {
			const dateData = new Date(rowData.date);
			const hora = dateData.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
			return <>{hora}</>;
		},
	},
	// { nombre: "Divisa", campo: "currency" },
	{ nombre: "Precio", campo: "amount" },
];
