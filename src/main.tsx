import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "@/App";

import { store } from "./store";
import { Provider } from "react-redux";

import "./global.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
// import "./assets/styles/theme.css"
import "primeicons/primeicons.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	// </React.StrictMode>
);
