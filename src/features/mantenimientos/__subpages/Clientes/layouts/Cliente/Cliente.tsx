import React, { useState, useRef } from "react";
import style from "./Cliente.module.css";
import { Toast } from "primereact/toast";
import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { SelectField } from "@/components/SelectField/SelectField";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { Divider } from "primereact/divider";
import { CheckBoxField } from "@/components/CheckBoxField/CheckBoxField";
import { SwitchField } from "@/components/SwitchField/SwitchField";

export const Cliente = () => {
  const toast = useRef<Toast>(null);
  const [newBank, setNewBank] = useState<any>({
    name: "",
    address: "",
    ruc: "",
    phone1: "",
    phone2: "",
  });

  return (
    <>
      <Toast ref={toast} />
      <MainContentStructure titleText="Mantenimiento de cliente">
        <SectionStructure>
          <ContentBox backgroundActive={true}>
            <div className={style.client__container}>
              <TextBoxField
                textLabel="Código:"
                value={newBank.name || ""}
                name="name"
                onChange={(e) => handleChangeInput(e, setNewBank)}
                direction="row"
                labelWidth="100px"
              />

              <TextBoxField
                textLabel="RUC:"
                value={newBank.name || ""}
                name="name"
                onChange={(e) => handleChangeInput(e, setNewBank)}
                direction="row"
                labelWidth="100px"
              />

              <TextBoxField
                textLabel="Nombre:"
                value={newBank.name || ""}
                name="name"
                onChange={(e) => handleChangeInput(e, setNewBank)}
                direction="row"
                labelWidth="100px"
              />

              <TextBoxField
                textLabel="Dirección:"
                value={newBank.address || ""}
                name="address"
                onChange={(e) => handleChangeInput(e, setNewBank)}
                direction="row"
                labelWidth="100px"
              />

              <SelectField
                textLabel="Distrito:"
                value={""}
                name=""
                onChange={() => {}}
                options={[]}
                direction="row"
                labelWidth="100px"
              />

              <SelectField
                textLabel="Dpto:"
                value={""}
                name=""
                onChange={() => {}}
                options={[]}
                direction="row"
                labelWidth="100px"
              />

              <SelectField
                textLabel="Zona:"
                value={""}
                name=""
                onChange={() => {}}
                options={[]}
                direction="row"
                labelWidth="100px"
              />

              <SelectField
                textLabel="Grupo Cliente:"
                value={""}
                name=""
                onChange={() => {}}
                options={[]}
                direction="row"
                labelWidth="100px"
              />

              <TextBoxField
                textLabel="Dir. Cobranza:"
                value={newBank.address || ""}
                name="address"
                onChange={(e) => handleChangeInput(e, setNewBank)}
                direction="row"
                labelWidth="100px"
              />

              <TextBoxField
                textLabel="Dir. Entrega:"
                value={newBank.address || ""}
                name="address"
                onChange={(e) => handleChangeInput(e, setNewBank)}
                direction="row"
                labelWidth="100px"
              />

              <TextBoxField
                textLabel="Contacto de Entrega:"
                value={""}
                name="address"
                onChange={(e) => handleChangeInput(e, setNewBank)}
                direction="row"
                labelWidth="100px"
              />

              <TextBoxField
                textLabel="Teléfono 1:"
                value={newBank.phone1 || ""}
                name="phone1"
                type="number"
                onChange={(e) => handleChangeInput(e, setNewBank)}
                direction="row"
                labelWidth="100px"
              />

              <TextBoxField
                textLabel="Teléfono 2:"
                value={newBank.phone2 || ""}
                name="phone2"
                type="number"
                onChange={(e) => handleChangeInput(e, setNewBank)}
                direction="row"
                labelWidth="100px"
              />

              <TextBoxField
                textLabel="Fax:"
                value={newBank.phone2 || ""}
                name="phone2"
                type="number"
                onChange={(e) => handleChangeInput(e, setNewBank)}
                direction="row"
                labelWidth="100px"
              />

              <TextBoxField
                textLabel="E-mail:"
                value={""}
                name="phone2"
                type="number"
                onChange={(e) => handleChangeInput(e, setNewBank)}
                direction="row"
                labelWidth="100px"
              />

              <TextBoxField
                textLabel="Fecha N:"
                value={""}
                name="address"
                onChange={(e) => handleChangeInput(e, setNewBank)}
                direction="row"
                labelWidth="100px"
              />
            </div>
          </ContentBox>

          <Divider />

          <ContentBox backgroundActive={true}>
            <div className={style.client__container}>
				<div className={style.client__box}>

              <SelectField
                textLabel="Tipo cliente:"
                value={""}
                name=""
                onChange={() => {}}
                options={[]}
                direction="row"
                labelWidth="100px"
              />
              <TextBoxField
                textLabel="Dias Máximo Nota Despacho:"
                value={""}
                name=""
                type="number"
                onChange={(e) => handleChangeInput(e, setNewBank)}
                direction="row"
                labelWidth="100px"
              />
              <TextBoxField
                textLabel="Dias crédito:"
                value={""}
                name=""
                type="number"
                onChange={(e) => handleChangeInput(e, setNewBank)}
                direction="row"
                labelWidth="100px"
              />
              <TextBoxField
                textLabel="Cuotas crédito:"
                value={""}
                name=""
                type="number"
                onChange={(e) => handleChangeInput(e, setNewBank)}
                direction="row"
                labelWidth="100px"
				/>

				</div>
              <div className={style.switch__container}>
                <SwitchField
                  textLabel="No mostrar precio en Nota Despacho:"
                  value={false}
                  name=""
                  onChange={() => {}}
                  direction="row"
                  labelWidth="300px"
                />
                <SwitchField
                  textLabel="No mostrar totales en Nota Despacho:"
                  value={false}
                  name=""
                  onChange={() => {}}
                  direction="row"
                  labelWidth="300px"
                />
                <SwitchField
                  textLabel="Mostrar saldo de consumo en Nota Despacho:"
                  value={false}
                  name=""
                  onChange={() => {}}
                  direction="row"
                  labelWidth="300px"
                />
                <SwitchField
                  textLabel="Clave para descuentos:"
                  value={false}
                  name=""
                  onChange={() => {}}
                  direction="row"
                  labelWidth="300px"
                />
                <SwitchField
                  textLabel="Cliente no modificable:"
                  value={false}
                  name=""
                  onChange={() => {}}
                  direction="row"
                  labelWidth="300px"
                />
                <SwitchField
                  textLabel="Aplicar Retención:"
                  value={false}
                  name=""
                  onChange={() => {}}
                  direction="row"
                  labelWidth="300px"
                />
              </div>
            </div>
          </ContentBox>
          <div>
            <Button className="p-button-sm p-button-info mr-2">
              AGREGAR CLIENTE
            </Button>
          </div>
        </SectionStructure>
      </MainContentStructure>
    </>
  );
};
