import React from "react";
import style from "./Reportes.module.css";
import { useModal } from "@/hooks/useModal";

import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { SelectField } from "@/components/SelectField/SelectField";
import { HeaderDataTable } from "@/components/HeaderDataTable/HeaderDataTable";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { Calendar } from "primereact/calendar";
import { CustomButton } from "@/components/CustomButton/CustomButton";

export const Reportes = () => {
  const addModal = useModal();

  return (
    <>
      <MainContentStructure titleText="Reportes">
        <SectionStructure>
          <ContentBox additionalClassName={style.section__buscador}>
            <div className={style.buscador__container}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <label className={style.label__item}>Fecha de inicio:</label>
                <Calendar showIcon />
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <label className={style.label__item}>Fecha de fin:</label>
                <Calendar showIcon />
              </div>

              <div className={style.button__container}>
                <CustomButton
                  text="Buscar"
                  height="50px"
                  sizeP="18px"
                  backgroundButton="var(--cta-color-3)"
                  colorP="#fff"
                  onClick={() => ""}
                />
              </div>
            </div>
          </ContentBox>
          <HeaderDataTable isExport isSearch />

          <DataTable
            columns={columns}
            data={""}
            // textAddButton="AGREGAR PROMOCIONES"
            // onAddModal={addModal.onVisibleModal}
          />
        </SectionStructure>
      </MainContentStructure>

      {/* Add Modal */}
      <PrimeModal
        header="Agregar promociones"
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
  { nombre: "Nro. comprobante", campo: "name" },
  { nombre: "Precio total", campo: "ruc" },
  { nombre: "Fecha", campo: "address" },
  
];
