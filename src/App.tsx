import React, { useEffect } from "react";

import { AppRoutes } from "./routes/AppRoutes";

import { addLocale, locale } from "primereact/api";
import { useAppDispatch } from "./store/hooks";
import { refreshToken, isLoading } from "@/store/slices/auth";

export const App = () => {
	addLocale("es", {
		firstDayOfWeek: 1,
		dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
		dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
		dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
		monthNames: [
			"Enero",
			"Febrero",
			"Marzo",
			"Abril",
			"Mayo",
			"Junio",
			"Julio",
			"Agosto",
			"Septiembre",
			"Octubre",
			"Noviembre",
			"Diciembre",
		],
		monthNamesShort: [
			"Ene",
			"Feb",
			"Mar",
			"Abr",
			"May",
			"Jun",
			"Jul",
			"Ago",
			"Sep",
			"Oct",
			"Nov",
			"Dic",
		],
		today: "Hoy",
		clear: "Limpiar",
	});

	locale("es");

	// refresh token
	const dispatch = useAppDispatch();
	useEffect(() => {
		const tokenStorage = localStorage.getItem("rt__grifosBackoffice");
		if (tokenStorage) {
			dispatch(refreshToken(tokenStorage));
		} else {
			dispatch(isLoading());
		}
	}, []);
	return (
		<>
			<AppRoutes />
		</>
	);
};
