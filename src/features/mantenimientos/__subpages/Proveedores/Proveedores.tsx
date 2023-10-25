import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { ProviderData } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Proveedores = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<ProviderData | null>(null);

	const { data, reloadFetchData } = useGetFetch<ProviderData>("/providers?isActive=true");
	const { postFetchData } = usePostFetch(
		"/providers/create",
		toast,
		addModal,
		reloadFetchData,
		"Proveedor"
	);
	const { deleteFetchData } = useDeleteFetch(
		"/providers",
		toast,
		addModal,
		reloadFetchData,
		"Proveedor"
	);
	const { updateFetchData } = useUpdateFetch(
		"/providers",
		toast,
		updateModal,
		reloadFetchData,
		"Proveedor"
	);

	const onUpdate = (data: ProviderData | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de proveedor">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR PROVEEDOR"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar proveedor"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
				width={1000}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar proveedor"
				modalStatus={updateModal.modalStatus}
				onHideModal={updateModal.onHideModal}
				width={1000}
			>
				<AddModal updateFetchData={updateFetchData} updateData={currentUpdateData} />
			</PrimeModal>
		</>
	);
};

const columns = [
	{ nombre: "ID", campo: "id" },
	{ nombre: "Nombre", campo: "name" },
	{ nombre: "R.U.C", campo: "ruc" },
	{ nombre: "Dirección", campo: "address" },
	{
		nombre: "Teléfono 1",
		body: (rowData: any) => {
			return <>{rowData.phones[0]}</>;
		},
	},
	{
		nombre: "Teléfono 2",
		body: (rowData: any) => {
			return <>{rowData.phones[1]}</>;
		},
	},
	{ nombre: "Contacto", campo: "contact" },
	{ nombre: "Fax", campo: "fax" },
	{ nombre: "Email", campo: "email" },
	{ nombre: "Proveedor PNP", campo: "isPnp" },
];
