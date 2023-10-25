import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/useGetFetch";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { CategoriaExtraData } from "./types";
import style from "./MensajePredeterminadosCliente.module.css";

import { Toast } from "primereact/toast";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { SwitchField } from "@/components/SwitchField/SwitchField";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import PrimeTextArea from "@/primeComponents/PrimeTextArea/PrimeTextArea";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { SaveButton } from "@/components/SaveButton/SaveButton";

export const MensajePredeterminadosCliente = () => {
  const toast = useRef<Toast>(null);
  const addModal = useModal();
  const updateModal = useModal();

  const [currentUpdateData, setCurrentUpdateData] =
    useState<CategoriaExtraData | null>(null);

  const { data, reloadFetchData } = useGetFetch<CategoriaExtraData>(
    "/product/extra-category?isActive=true"
  );
  const { postFetchData } = usePostFetch(
    "/product/extra-category",
    toast,
    addModal,
    reloadFetchData,
    "Categoría extra"
  );
  const { deleteFetchData } = useDeleteFetch(
    "/product/extra-category",
    toast,
    addModal,
    reloadFetchData,
    "Categoría extra"
  );
  const { updateFetchData } = useUpdateFetch(
    "/product/extra-category",
    toast,
    updateModal,
    reloadFetchData,
    "Categoría extra"
  );

  // Logica para el modal del update y sus datos
  const onUpdate = (data: CategoriaExtraData | null) => {
    setCurrentUpdateData(data);
    updateModal.onVisibleModal();
  };

  return (
    <>
      <Toast ref={toast} />
      <MainContentStructure titleText="Mensaje Predeterminado cliente">
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

          <ContentBox>
            <h4>Mensaje 1</h4>
            <TextBoxField
              textLabel="Título:"
              name="title"
              value=""
              direction="row"
              onChange={() => ""}
              labelWidth="80px"
            />
            <PrimeTextArea
              textLabel="Mensaje:"
              name=""
              value=""
              direction="row"
              onChange={() => ""}
            />
            <SwitchField
              textLabel="activo:"
              value={true}
              name=""
              onChange={() => ""}
              direction="row"
              labelWidth="80px"
            />
          </ContentBox>

          <ContentBox>
            <h4>Mensaje 2</h4>
            <TextBoxField
              textLabel="Título:"
              name="title"
              value=""
              direction="row"
              onChange={() => ""}
              labelWidth="80px"
            />
            <PrimeTextArea
              textLabel="Mensaje:"
              name=""
              value=""
              direction="row"
              onChange={() => ""}
            />
            <SwitchField
              textLabel="activo:"
              value={true}
              name=""
              onChange={() => ""}
              direction="row"
              labelWidth="80px"
            />
          </ContentBox>

          <ContentBox>
            <h4>Mensaje 3</h4>
            <TextBoxField
              textLabel="Título:"
              name="title"
              value=""
              direction="row"
              onChange={() => ""}
              labelWidth="80px"
            />
            <PrimeTextArea
              textLabel="Mensaje:"
              name=""
              value=""
              direction="row"
              onChange={() => ""}
            />
            <SwitchField
              textLabel="activo:"
              value={true}
              name=""
              onChange={() => ""}
              direction="row"
              labelWidth="80px"
            />
          </ContentBox>
          <div className={style.button__save}>
            <SaveButton />
          </div>
        </SectionStructure>
      </MainContentStructure>

      {/* Add Modal */}
      <PrimeModal
        header="Agregar categoría extra"
        modalStatus={addModal.modalStatus}
        onHideModal={addModal.onHideModal}
      >
        <AddModal postFetchData={postFetchData} />
      </PrimeModal>

      {/* Edit Modal */}
      <PrimeModal
        header="Editar categoría extra"
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
