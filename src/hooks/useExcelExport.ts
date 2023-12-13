import { useCallback } from "react";
import * as ExcelJS from "exceljs";

interface ExportOptions {
	fileName: string;
	sheetName: string;
}

export const useExcelExport = () => {
	const defaultExportOptions: ExportOptions = {
		fileName: "reporte",
		sheetName: "Reporte",
	};

	const defaultHeaderStyle: any = {
		fill: {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "232C3D" },
		},
		font: {
			color: { argb: "FFFFFFFF" },
			bold: true,
			size: 13,
		},
		alignment: {
			vertical: "middle",
			horizontal: "center",
		},
		border: {
			top: { style: "thin" },
			left: { style: "thin" },
			bottom: { style: "thin" },
			right: { style: "thin" },
		},
	};

	const exportToExcel = useCallback((data: any[], options?: ExportOptions, headerStyle?: any) => {
		const exportOpts: ExportOptions = { ...defaultExportOptions, ...options };
		const styleOpts: any = { ...defaultHeaderStyle, ...headerStyle };

		const { fileName, sheetName } = exportOpts;

		if (data.length === 0) {
			console.error("Data is empty. Cannot export to Excel.");
			return;
		}

		const columns = Object.keys(data[0]).map((key) => ({
			header: key,
			key: key,
			width: 15,
		}));

		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet(sheetName);

		worksheet.columns = columns;

		worksheet.addRows(data);

		const headerRow = worksheet.getRow(1);
		headerRow.eachCell((cell) => {
			cell.fill = styleOpts.fill;
			cell.font = styleOpts.font;
			cell.alignment = styleOpts.alignment;
			cell.border = styleOpts.border;
		});

		workbook.xlsx.writeBuffer().then((buffer) => {
			const blob = new Blob([buffer], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			const url = window.URL.createObjectURL(blob);

			const a = document.createElement("a");
			a.href = url;
			a.download = `${fileName}.xlsx`;
			document.body.appendChild(a);
			a.click();

			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		});
	}, []);

	return { exportToExcel };
};
