import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

import { LoginPage } from "../features/login/pages/LoginPage";

import { AppRoutesMantenimientos } from "./AppRoutesMantenimientos";
import { HomePage } from "@/features/home/pages/HomePage";

export function AppRoutes() {
	const { login, isLoading } = useAppSelector((state) => state.auth);

	// if (isLoading) {
	// 	return <></>;
	// }

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/*" element={<AppRoutesMantenimientos />} />
			</Routes>
			{/* <Routes>
				{!!login ? (
					<>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/*" element={<Navigate to="/login" />} />
					</>
				) : (
					<>
						<Route path="/login" element={<Navigate to="/" />} />

						<Route path="/*" element={<AppRoutesMantenimientos />} />

						<Route path="/*" element={<Navigate to="/" />} />
					</>
				)}
			</Routes> */}
		</BrowserRouter>
	);
}
