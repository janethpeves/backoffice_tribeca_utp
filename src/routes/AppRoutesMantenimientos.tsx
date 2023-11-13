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
import { SeguimientoClientes } from "@/features/mantenimientos/subpages/SeguimientosClientes/SeguimientoClientes";
import { Proyectos } from "@/features/mantenimientos/subpages/Proyectos/Proyectos";
import { CategoriasProductos } from "@/features/mantenimientos/subpages/CategoriasProductos/CategoriasProducto";
import { Promociones } from "@/features/mantenimientos/subpages/Promociones/Promociones";
import { Reportes } from "@/features/mantenimientos/subpages/Reportes/Reportes";
import { Tokens } from "@/features/mantenimientos/subpages/Tokens/Tokens";
import { Monedas } from "@/features/mantenimientos/subpages/Monedas/Monedas";
import { HistorialUso } from "@/features/mantenimientos/subpages/HistorialUso/HistorialUso";
import { Dashboard } from "@/features/mantenimientos/subpages/Dashboard/Dashboard";
import { Departamento } from "@/features/mantenimientos/subpages/Departamento/Departamento";

export const AppRoutesMantenimientos = () => {
	return (
		<AppStructure>
			<MainHeader />
			<div className={style.mainContent__container}>
				<Sidebar appRoutes={appRoutesMantenimientos} />

				<Routes>
					{/* <Route path="/" element={<Mantenimientos />} /> */}
					<Route path="/" element={<Dashboard />} />
					<Route path="/usuarios" element={<Usuarios />} />
					<Route path="/seguimiento-clientes" element={<SeguimientoClientes />} />
					<Route path="/proyectos" element={<Proyectos />} />
					<Route path="/departamento" element={<Departamento />} />
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
