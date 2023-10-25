import React from "react";
import style from "./DescuentoPorcentaje.module.css";

import { PrimeDataTable } from "@/primeComponents/PrimeDataTable/PrimeDataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { SaveButton } from "@/components/SaveButton/SaveButton";

export const DescuentoPorcentaje = () => {
  return (
    <>
      <MainContentStructure titleText="Descuento por Porcentaje">
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

        <br />

        <ContentBox>
          <div className={style.cantidad__contaner}>
            <TextBoxField
              textLabel="Cantidad inicial:"
              name=""
              value=""
              onChange={() => ""}
            />
            <TextBoxField
              textLabel="Cantidad final:"
              name=""
              value=""
              onChange={() => ""}
            />
            <TextBoxField
              textLabel="Porcentaje:"
              name=""
              value=""
              onChange={() => ""}
            />
          </div>
          <br />
          <div className={style.button__container}>
            <SaveButton />
          </div>
        </ContentBox>

        <PrimeDataTable
          columns={columns}
          data={[]}
          isActionVerify={false}
          onUpdate={() => {}}
          onDelete={() => {}}
        />
      </MainContentStructure>
    </>
  );
};

const columns = [
  { nombre: "ID", campo: "id" },
  { nombre: "Nombre", campo: "name" },
  { nombre: "Descripción", campo: "description" },
];
