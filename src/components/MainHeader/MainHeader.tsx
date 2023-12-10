import React, { useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { IoPersonOutline, IoLogOutOutline } from "react-icons/io5";
import PersonIcon from "@mui/icons-material/Person";

import { logoutUser } from "../../store/slices/auth/thunks";
import { Toast } from "primereact/toast";
import logo from "@/assets/logo-reclamos.png";
import style from "./MainHeader.module.css";
import { Button } from "primereact/button";
import { Mantenimientos } from "../../features/mantenimientos/pages/Mantenimientos";
import { InputText } from "primereact/inputtext";
import { useAppDispatch } from "@/store/hooks";

export const MainHeader = ({ title = "", actionButton = false }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const toast = useRef(null);
	const [menuActive, setMenuActive] = useState(false);

	const handleNavigate = (path: string) => {
		navigate(`/${path}`);
		setMenuActive(false);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate("/login");
	};

	return (
		<header className={style.mainHeader__container}>
			<Toast ref={toast} />
			<div style={{ display: "flex", alignItems: "center", gap: "100px" }}>
				<div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
					<p className={style.mainHeader__title}>TRIBECA BACKOFFICE</p>
					{/* <p className={style.mainHeader__title}>{title}</p> */}
				</div>
			</div>

			<div className={style.mainHeader__navbar__container}>
				<div style={{ position: "relative" }}>
					<div className={style.mainHeader__profile} onClick={() => setMenuActive((prev) => !prev)}>
						<PersonIcon />
					</div>
					{menuActive && (
						<div className={style.profileMenu}>
							<ul className={style.profileMenu__list}>
								<li className={style.profileMenu__item} onClick={handleLogout}>
									<IoLogOutOutline size={20} /> Cerrar Sesión
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};
