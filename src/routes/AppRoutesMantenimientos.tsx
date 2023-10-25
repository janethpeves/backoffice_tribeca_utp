import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import style from "./AppRoutes.module.css";

import Sidebar from "../components/Sidebar/Sidebar";
import { MainHeader } from "../components/MainHeader/MainHeader";
import { AppStructure } from "../components/AppStructure/AppStructure";
import { appRoutesMantenimientos } from "@/data/Rutas";

// submenu
import { Mantenimientos } from "../features/mantenimientos/pages/Mantenimientos";
import { Usuarios } from "@/features/mantenimientos/subpages/Usuarios/Usuarios";
import { NegociosAliados } from "@/features/mantenimientos/subpages/NegociosAliados/NegociosAliados";
import { Sedes } from "@/features/mantenimientos/subpages/Sedes/Sedes";
import { GestionRoles } from "@/features/mantenimientos/subpages/GestionRoles/GestionRoles";
import { CategoriasProductos } from "@/features/mantenimientos/subpages/CategoriasProductos/CategoriasProducto";
import { Promociones } from "@/features/mantenimientos/subpages/Promociones/Promociones";
import { Reportes } from "@/features/mantenimientos/subpages/Reportes/Reportes";
import { Tokens } from "@/features/mantenimientos/subpages/Tokens/Tokens";
import { Monedas } from "@/features/mantenimientos/subpages/Monedas/Monedas";
import { HistorialUso } from "@/features/mantenimientos/subpages/HistorialUso/HistorialUso";

export const AppRoutesMantenimientos = () => {
	return (
		<AppStructure>
			<MainHeader />
			<div className={style.mainContent__container}>
				<Sidebar appRoutes={appRoutesMantenimientos} />

				<Routes>
					<Route path="/" element={<Mantenimientos />} />
					<Route path="/usuarios" element={<Usuarios />} />
					<Route path="/negocios-aliados" element={<NegociosAliados />} />
					<Route path="/sedes" element={<Sedes />} />
					<Route path="/gestion-roles" element={<GestionRoles />} />
					<Route path="/categorias-productos" element={<CategoriasProductos />} />
					<Route path="/promociones" element={<Promociones />} />
					<Route path="/reportes" element={<Reportes />} />
					<Route path="/tokens" element={<Tokens />} />
					<Route path="/monedas" element={<Monedas />} />
					<Route path="/historial-uso" element={<HistorialUso />} />


					<Route path="/*" element={<Navigate to="/" />} />
				</Routes>
			</div>
		</AppStructure>
	);
};
