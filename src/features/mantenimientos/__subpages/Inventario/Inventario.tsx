import React from "react";
import style from "./Inventario.module.css";
import { Link } from "react-router-dom";

export const Inventario = () => {
	return (
		<div className={style.section__container}>
			<div className={style.header__container}>INVENTARIO</div>
			<div className={style.list__section}>
				{/* Grupos de lista */}
				<div className={style.list__container}>
					{/* <h2 className={style.list__title}>Grupo 1</h2> */}
					<ul className={style.list__item__group}>
						<Link to="/mantenimientos/inventario/locales">
							<li className={style.list__item}>Locales</li>
						</Link>
						<Link to="/mantenimientos/inventario/almacenes">
							<li className={style.list__item}>Almacenes</li>
						</Link>

						<Link to="/mantenimientos/inventario/grupo">
							<li className={style.list__item}>Grupo</li>
						</Link>
						<Link to="/mantenimientos/inventario/subgrupo">
							<li className={style.list__item}>Subgrupo</li>
						</Link>
						<Link to="/mantenimientos/inventario/subgrupo-categoria">
							<li className={style.list__item}>Subgrupo Categoría</li>
						</Link>
						<Link to="/mantenimientos/inventario/categoria-extra">
							<li className={style.list__item}>Categoría Extra</li>
						</Link>

						<Link to="/mantenimientos/inventario/unidad-medida">
							<li className={style.list__item}>Unidad de Medida</li>
						</Link>
						<Link to="/mantenimientos/inventario/lista-precio">
							<li className={style.list__item}>Listas de Precio</li>
						</Link>
						<Link to="/mantenimientos/inventario/tipo-ingreso">
							<li className={style.list__item}>Tipos de Ingresos</li>
						</Link>
						<Link to="/mantenimientos/inventario/tipo-salida">
							<li className={style.list__item}>Tipos de Salidas</li>
						</Link>
					</ul>
				</div>

				{/* Fin de grupos de lista */}
			</div>
		</div>
	);
};
