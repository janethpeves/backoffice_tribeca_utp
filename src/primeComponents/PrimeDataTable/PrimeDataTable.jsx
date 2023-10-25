import { useEffect, useState } from "react";

import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

export const PrimeDataTable = ({ columns, data, isActionVerify, onUpdate, onDelete }) => {
	const [dataTable, setDataTable] = useState(data);

	useEffect(() => {
		setDataTable(data);
	}, [data]);

	const buttonSuccess = (rowData) => {
		return (
			<Button
				className="p-button-info p-button-rounded"
				style={{ width: "40px", height: "40px" }}
				type="button"
				icon="pi pi-pencil"
				onClick={() => onUpdate(rowData)}
			/>
		);
	};
	const buttonDecline = (rowData) => {
		return (
			<Button
				className="p-button-danger p-button-rounded"
				style={{ width: "40px", height: "40px" }}
				type="button"
				icon="pi pi-trash"
				onClick={() => {
					onDelete(rowData.id);
				}}
			/>
		);
	};
	return (
		<>
			<DataTable
				value={dataTable}
				paginator
				rows={5}
				dataKey="id"
				responsiveLayout="scroll"
				emptyMessage="No se han encontrado resultados."
			>
				{columns &&
					columns.map((column) => (
						<Column
							key={`${column.campo}`}
							sortable
							field={column.campo}
							body={column.body}
							header={column.nombre}
							style={{
								minWidth: "10rem",
							}}
						/>
					))}

				{/* Botones para verificar transacciones */}
				{isActionVerify && <Column style={{ width: "5rem" }} body={buttonSuccess} />}
				{isActionVerify && <Column style={{ width: "5rem" }} body={buttonDecline} />}
			</DataTable>
		</>
	);
};
