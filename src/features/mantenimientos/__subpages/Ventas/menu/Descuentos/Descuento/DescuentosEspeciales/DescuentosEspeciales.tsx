import React from 'react'
import style from "./DescuentosEspeciales.module.css"

import { DataTable } from '@/components/DataTable/DataTable'
import { MainContentStructure } from '@/components/MainContentStructure/MainContentStructure'
import { ContentBox } from '@/components/ContentBox/ContentBox'
import { TextBoxField } from '@/components/TextBoxField/TextBoxField'
import { SectionStructure } from '@/components/SectionStructure/SectionStructure'
import { SwitchField } from '@/components/SwitchField/SwitchField'
import { PrimeModal } from '@/primeComponents/PrimeModal/PrimeModal'
import { useModal } from '@/hooks/useModal'
import { AddModal } from './AddModal/AddModal'


export const DescuentosEspeciales = () => {
  const addModal = useModal();
	const updateModal = useModal();


  return (
    <>
			<MainContentStructure titleText='Descuentos Especiales'>
      <SectionStructure>
       <ContentBox backgroundActive>
          <div className={style.header__message}>
            <TextBoxField
              textLabel="Cliente:"
              name="client"
              value=""
              direction="row"
              onChange={() => ""}
              labelWidth="90px"
            />
            <TextBoxField
              textLabel="Razón Social:"
              name="client"
              value=""
              direction="row"
              onChange={() => ""}
              labelWidth="90px"
            />
            
          </div>
          {/* <br/> */}
          <div className={style.switch__container}>
          <SwitchField
            textLabel='Todos'
            value={false}
            name='"'
            onChange={()=>("")}
            direction='row'
            labelWidth='50px'
            />
            </div>
        </ContentBox> 
      </SectionStructure>
      

        <br/>
				<DataTable
					columns={columns}
					data={""}
					textAddButton="AGREGAR PRODUCTO"
					onAddModal={addModal.onVisibleModal}
					onUpdate={""}
					onDelete={""}
				/>
			</MainContentStructure>
      {/* Add Modal */}
			<PrimeModal
				header="Agregar producto"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
			>
				<AddModal  />
			</PrimeModal>

			{/* Edit Modal */}
			<PrimeModal
				header="Editar producto"
				modalStatus={updateModal.modalStatus}
				onHideModal={updateModal.onHideModal}
			>
				<AddModal  />
			</PrimeModal>
    </>
  )
}
const columns = [
	{ nombre: "Producto", campo: "id" },
	{ nombre: "Forma de Pago", campo: "name" },
	{ nombre: "Tipo de Rango", campo: "description" },
  { nombre: "Método", campo: "name" },
  { nombre: "Valor", campo: "name" },
  { nombre: "Rango Inicial", campo: "name" },
  { nombre: "Rango Final", campo: "name" },
  { nombre: "Dscto. Auto", campo: "name" },
];