import React, { useRef, useState } from "react";
import style from "./Descuentos.module.css";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { HeaderDataTable } from "@/components/HeaderDataTable/HeaderDataTable";
import { PrimeDataTable } from "@/primeComponents/PrimeDataTable/PrimeDataTable";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { SelectField } from "@/components/SelectField/SelectField";
import PrimeCalendar from "@/primeComponents/PrimeCalendar/PrimeCalendar";

export const Descuentos = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  return (
    <>
      <Toast ref={toast} />
      <MainContentStructure titleText="Descuentos">
        <SectionStructure additionalClassName={style.section__buttons}>
          <div className={style.buttons__container}>
            <CustomButton
              text="Crear descuento por categoría"
              height="80px"
              sizeP="18px"
              backgroundButton= "var(--cta-color-1)"
              colorP="#fff"
              onClick={() =>
                navigate(
                  "/mantenimientos/ventas/descuentos/descuento-categoria"
                )
              }
            />
            <CustomButton
              text="Crear descuento por porcentaje"
              height="80px"
              sizeP="18px"
              backgroundButton="var(--cta-color-2)"
              colorP="#fff"
              onClick={() =>
                navigate(
                  "/mantenimientos/ventas/descuentos/descuento-porcentaje"
                )
              }
            />
            <CustomButton
              text="Crear descuentos especiales"
              height="80px"
              sizeP="18px"
              backgroundButton="var(--cta-color-3)"
              colorP="#fff"
              onClick={() =>
                navigate(
                  "/mantenimientos/ventas/descuentos/descuentos-especiales"
                )
              }
            />
          </div>
        </SectionStructure>
        <br />
        <SectionStructure>
          <ContentBox>
            <div className={style.buscador__container}>
              <SelectField
                textLabel="Tipo:"
                value={""}
                name=""
                onChange={() => ""}
                options={[]}
				direction="row"
              />
              <PrimeCalendar
                textLabel="f. inicio"
                name=""
                value={""}
                onChange={() => ""}
              />
              <PrimeCalendar
                textLabel="f. fin"
                name=""
                value={""}
                onChange={() => ""}
              />
            </div>
          </ContentBox>
          <HeaderDataTable isExport isSearch />

          {/* Tabla */}
          <PrimeDataTable
            columns={columns}
            data={[]}
            isActionVerify={false}
            onUpdate={() => {}}
            onDelete={() => {}}
          />
        </SectionStructure>
      </MainContentStructure>
    </>
  );
};

const columns = [
  { nombre: "ID", campo: "id" },
  { nombre: "Nombre", campo: "name" },
  { nombre: "Descripción", campo: "description" },
];
