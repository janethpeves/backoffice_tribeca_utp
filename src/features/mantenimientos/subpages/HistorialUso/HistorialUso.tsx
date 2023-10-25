import React from "react";
import { useModal } from "@/hooks/useModal";

import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { HeaderDataTable } from "@/components/HeaderDataTable/HeaderDataTable";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";

export const HistorialUso = () => {
  const addModal = useModal();

  return (
    <>
      <MainContentStructure titleText="Historial de uso">
        <SectionStructure>
          <HeaderDataTable isExport isSearch />

          <DataTable
            columns={columns}
            data={""}
            // textAddButton="AGREGAR MONEDAS"
            // onAddModal={addModal.onVisibleModal}
          />
        </SectionStructure>
      </MainContentStructure>

      {/* Add Modal */}
      {/* <PrimeModal
				header="Agregar monedas"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal postFetchData={() => {}} />
			</PrimeModal> */}
    </>
  );
};

const columns = [
  // { nombre: "ID", campo: "id" },
  { nombre: "Tipo", campo: "name" },
  { nombre: "Tabla", campo: "address" },
  { nombre: "Fecha modif.", campo: "ruc" },
  { nombre: "Usuario", campo: "address" },
];
