import React from "react";
import { useModal } from "@/hooks/useModal";

import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { HeaderDataTable } from "@/components/HeaderDataTable/HeaderDataTable";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";

export const SeguimientoClientes = () => {
  const addModal = useModal();

  return (
    <>
      <MainContentStructure titleText="Seguimiento de Clientes">
        <SectionStructure>
          <HeaderDataTable isExport isSearch />

          <DataTable
            columns={columns}
            data={""}
            onAddModal={addModal.onVisibleModal}
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
  { nombre: "Nombre", campo: "name" },
  { nombre: "Apellido", campo: "ruc" },
  {
    nombre: "Teléfono",
    body: (rowData: any) => {
      return <>{rowData.phones[0]}</>;
    },
  },
  { nombre: "Correo", campo: "address" },
  { nombre: "Mensaje", campo: "address" },
  { nombre: "Fecha de Registro", campo: "address" },
  { nombre: "estado", campo: "address" },
  { nombre: "Obs", campo: "address" },
];
