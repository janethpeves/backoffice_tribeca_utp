import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { DocumentType } from "./types";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const TipoDocumento = () => {
	const toast = useRef<Toast>(null);
	const addModal = useModal();
	const updateModal = useModal();

	const [currentUpdateData, setCurrentUpdateData] = useState<DocumentType | null>(null);

	const { data, reloadFetchData } = useGetFetch<DocumentType>("/document-type?isActive=true");
	const { postFetchData } = usePostFetch(
		"/document-type/create", // url conection
		toast, // toast reference
		addModal, //customHook modal
		reloadFetchData, // reload fetchGet
		"Tipo de documento" // Name section
	);
	const { deleteFetchData } = useDeleteFetch(
		"/document-type",
		toast,
		addModal,
		reloadFetchData,
		"Tipo de documento"
	);
	const { updateFetchData } = useUpdateFetch(
		"/document-type",
		toast,
		updateModal,
		reloadFetchData,
		"Tipo de documento"
	);

	// Logica para el modal del update y sus datos
	const onUpdate = (data: DocumentType | null) => {
		setCurrentUpdateData(data);
		updateModal.onVisibleModal();
	};

	return (
		<>
			<Toast ref={toast} />
			<MainContentStructure titleText="Mantenimiento de tipos de documento">
				<DataTable
					columns={columns}
					data={data}
					textAddButton="AGREGAR TIPO DE DOCUMENTO"
					onAddModal={addModal.onVisibleModal}
					onUpdate={onUpdate}
					onDelete={deleteFetchData}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar tipo de documento"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={postFetchData} />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar tipo de documento"
				modalStatus={updateModal.modalStatus}
				onHideModal={updateModal.onHideModal}
			>
				<AddModal updateFetchData={updateFetchData} updateData={currentUpdateData} />
			</PrimeModal>
		</>
	);
};

const columns = [
	// { nombre: "ID", campo: "id" },
	{ nombre: "Descripción", campo: "name" },
	{ nombre: "Abreviatura", campo: "abbreviation" },
	{ nombre: "Documento Comercial", campo: "business_doc" },
];
