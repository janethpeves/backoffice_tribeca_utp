import React, { useState } from "react";
import style from "./Dashboard.module.css";

import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export function Dashboard() {
	return (
		<MainContentStructure titleText="Dashboard">
			<div className={style.dashboard__container}>
				
				<div className={style.item}>
					<p className={style.item__title}>Usuarios Registrados</p>
					<p className={style.item__text}>4</p>
				</div>
				<div className={style.item}>
					<p className={style.item__title}>Clientes</p>
					<p className={style.item__text}>.</p>
				</div>
				<div className={style.item}>
					<p className={style.item__title}>.</p>
					<p className={style.item__text}>.</p>
				</div>
				
				<div className={style.item}>
					<p className={style.item__title}>Proyectos Construidos</p>
					<p className={style.item__text}>.</p>
				</div>
				<div className={style.item}>
					<p className={style.item__title}>Proyectos en Construcción</p>
					<p className={style.item__text}>.</p>
				</div>
				<div className={style.item}>
					<p className={style.item__title}>Proyectos Totales</p>
					<p className={style.item__text}>.</p>
				</div>
				<div className={style.item}>
					<p className={style.item__title}>Ofertas</p>
					<p className={style.item__text}>.</p>
				</div>
				
			</div>
		</MainContentStructure>
	);
}
