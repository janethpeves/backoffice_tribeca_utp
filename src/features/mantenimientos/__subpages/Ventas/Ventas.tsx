import React from "react";
import style from "./Ventas.module.css";
import { Link } from "react-router-dom";

export const Ventas = () => {
	return (
		<div className={style.section__container}>
			<div className={style.header__container}>VENTAS</div>
			<div className={style.list__section}>
				{/* Grupos de lista */}
				<div className={style.list__container}>
					{/* <h2 className={style.list__title}>Grupo 1</h2> */}
					<ul className={style.list__item__group}>
						<Link to="/mantenimientos/ventas/vendedor">
							<li className={style.list__item}>Vendedor</li>
						</Link>
						<Link to="/mantenimientos/ventas/lados-terminal">
							<li className={style.list__item}>Lados por terminal</li>
						</Link>

						<Link to="/mantenimientos/ventas/configuracion-isla-playa">
							<li className={style.list__item}>Configuración isla playa</li>
						</Link>
						<Link to="/mantenimientos/ventas/precios-grupos-cliente">
							<li className={style.list__item}>Precios grupos cliente</li>
						</Link>
						<Link to="/mantenimientos/ventas/precios-cliente">
							<li className={style.list__item}>Precios por cliente</li>
						</Link>
						<Link to="/mantenimientos/ventas/descuentos-especiales-configuracion">
							<li className={style.list__item}>Descuentos especiales configuración</li>
						</Link>

						<Link to="/mantenimientos/ventas/descuentos">
							<li className={style.list__item}>Descuentos</li>
						</Link>
						<Link to="/mantenimientos/ventas/descuento-categoria">
							<li className={style.list__item}>Descuento por categoría</li>
						</Link>
						<Link to="/mantenimientos/ventas/descuento-porcentaje">
							<li className={style.list__item}>Descuento por porcentaje</li>
						</Link>
						<Link to="/mantenimientos/ventas/mensaje-predeterminados-cliente">
							<li className={style.list__item}>Mensajes predeterminados por cliente</li>
						</Link>
						<Link to="/mantenimientos/ventas/gestion-flotas">
							<li className={style.list__item}>Gestión de flotas</li>
						</Link>
						<Link to="/mantenimientos/ventas/monto-base-articulo-cliente-100">
							<li className={style.list__item}>Monto base de artículos del cliente 100</li>
						</Link>
					</ul>
				</div>

				{/* Fin de grupos de lista */}
			</div>
		</div>
	);
};
