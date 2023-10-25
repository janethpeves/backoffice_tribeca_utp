import React from "react";
import { PrimeDataTable } from "@/primeComponents/PrimeDataTable/PrimeDataTable";

import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { HeaderDataTable } from "@/components/HeaderDataTable/HeaderDataTable";

interface DataTableProps {
	columns: any;
	data: any;
	textAddButton?: any;
	onAddModal?: any;
	onUpdate?: any;
	onDelete?: any;
	isActionVerify?: boolean;
	isExport?: boolean;
	isSearch?: boolean;
	children?: React.ReactNode;
}

export const DataTable = ({
	columns,
	data,
	textAddButton,
	onAddModal,
	onUpdate = true,
	onDelete,
	isActionVerify = true,
	isExport = true,
	isSearch = true,
	children
}: DataTableProps) => {
	return (
		<SectionStructure>
			{/* Header de la tabla (botones y buscador) */}
			{textAddButton && (
				<HeaderDataTable
					isExport={isExport}
					isSearch={isSearch}
					textAddButton={textAddButton}
					onAddModal={onAddModal}
				/>
			)}

			{/* Tabla */}
			<PrimeDataTable
				columns={columns}
				data={data}
				isActionVerify={isActionVerify}
				onUpdate={onUpdate}
				onDelete={onDelete}
			/>

			{children ? <div>{children}</div> : null}
		</SectionStructure>
	);
};
