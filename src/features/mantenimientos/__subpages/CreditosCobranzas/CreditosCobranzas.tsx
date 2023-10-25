import React from "react";
import style from "./CreditosCobranzas.module.css";
import { Link } from "react-router-dom";

export const CreditosCobranzas = () => {
	return (
		<div className={style.section__container}>
			<div className={style.header__container}>CRÉDITOS Y COBRANZAS</div>
			<div className={style.list__section}>
				{/* Grupos de lista */}
				<div className={style.list__container}>
					{/* <h2 className={style.list__title}>Grupo 1</h2> */}
					<ul className={style.list__item__group}>
						<Link to="/mantenimientos/creditos-cobranzas/tipo-pagos">
							<li className={style.list__item}>Tipos de pagos</li>
						</Link>
						<Link to="/mantenimientos/creditos-cobranzas/cobradores">
							<li className={style.list__item}>Cobradores</li>
						</Link>
						<Link to="/mantenimientos/creditos-cobranzas/placa-cliente">
							<li className={style.list__item}>Placas por cliente</li>
						</Link>
						<Link to="/mantenimientos/creditos-cobranzas/transportista-cliente">
							<li className={style.list__item}>Transportista por cliente</li>
						</Link>
						<Link to="/mantenimientos/creditos-cobranzas/unidad-cliente">
							<li className={style.list__item}>Unidad de clientes</li>
						</Link>
					</ul>
				</div>

				{/* Fin de grupos de lista */}
			</div>
		</div>
	);
};
