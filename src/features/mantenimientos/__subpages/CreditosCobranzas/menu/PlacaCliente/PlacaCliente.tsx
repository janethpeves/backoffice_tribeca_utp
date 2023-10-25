import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { AlmacenesData } from "./types";
import style from "./PlacaCliente.module.css";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";

export const PlacaCliente = () => {
  const toast = useRef<Toast>(null);
  const addModal = useModal();
  const updateModal = useModal();

  const [currentUpdateData, setCurrentUpdateData] =
    useState<AlmacenesData | null>(null);

  const { data, reloadFetchData } = useGetFetch<AlmacenesData>(
    "/ubication/department?isActive=true"
  );
  const { postFetchData } = usePostFetch(
    "/ubication/department",
    toast,
    addModal,
    reloadFetchData,
    "Departamento"
  );
  const { deleteFetchData } = useDeleteFetch(
    "/ubication/department",
    toast,
    addModal,
    reloadFetchData,
    "Departamento"
  );
  const { updateFetchData } = useUpdateFetch(
    "/ubication/department",
    toast,
    updateModal,
    reloadFetchData,
    "Departamento"
  );

  // Logica para el modal del update y sus datos
  const onUpdate = (data: AlmacenesData | null) => {
    setCurrentUpdateData(data);
    updateModal.onVisibleModal();
  };

  return (
    <>
      <Toast ref={toast} />
      <MainContentStructure titleText="Mantenimiento de placa por cliente">
        <SectionStructure>
          <ContentBox backgroundActive>
            <div className={style.header__message}>
              <TextBoxField
                textLabel="Cliente:"
                name="client"
                value=""
                direction="row"
                onChange={() => ""}
                labelWidth="80px"
              />
            </div>
          </ContentBox>
        </SectionStructure>
        <br />
        <DataTable
          columns={columns}
          data={data}
          textAddButton="AGREGAR PLACA POR CLIENTE"
          onAddModal={addModal.onVisibleModal}
          onUpdate={onUpdate}
          onDelete={deleteFetchData}
        />
      </MainContentStructure>

      {/* Add Modal */}
      <PrimeModal
        header="Agregar placa por cliente"
        modalStatus={addModal.modalStatus}
        onHideModal={addModal.onHideModal}
        width={1000}
      >
        <AddModal postFetchData={postFetchData} />
      </PrimeModal>

      {/* Edit Modal */}
      <PrimeModal
        header="Editar placa por cliente"
        modalStatus={updateModal.modalStatus}
        onHideModal={updateModal.onHideModal}
      >
        <AddModal
          updateFetchData={updateFetchData}
          updateData={currentUpdateData}
        />
      </PrimeModal>
    </>
  );
};

const columns = [
  { nombre: "Placa", campo: "placa" },
  { nombre: "Código", campo: "description" },
  { nombre: "Marca", campo: "address" },
  { nombre: "Modelo", campo: "department" },
  { nombre: "Color", campo: "province" },
  { nombre: "Año", campo: "district" },
  { nombre: "Combustible", campo: "ubigeo" },
  { nombre: "Clase Vehículo", campo: "additionalDescription" },
  { nombre: "Nro Serie", campo: "ubigeo" },
  { nombre: "Nro Motor", campo: "ubigeo" },
];
