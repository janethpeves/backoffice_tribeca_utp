import React, { useEffect, useState } from "react";

import style from "./Login.module.css";

import { ContenedorLogin } from "../components/ContenedorLogin";

import { useAppSelector } from "../../../store/hooks";

export const LoginPage = () => {
	return (
		<div className={style.container}>
			<ContenedorLogin />
		</div>
	);
};
