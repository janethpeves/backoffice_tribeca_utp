import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/connections/mainApi.js";

export const useDeleteFetch = (
	endPoint: string,
	toastRef: any,
	addModal: any,
	reloadFetchData: () => void,
	sectionName: string
) => {
	const [isLoadingDelete, setIsLoadingDelete] = useState(true);
	const [errorDelete, setErrorDelete] = useState<any>(null);
	const [successDelete, setSuccessDelete] = useState<boolean>(false);

	const setInitStateDelete = () => {
		setIsLoadingDelete(false);
		setErrorDelete(null);
		setSuccessDelete(false);
	};

	useEffect(() => {
		if (toastRef) {
			if (successDelete) {
				toastRef.current?.show({
					severity: "success",
					summary: `${sectionName} Eliminado`,
					detail: `${sectionName} ha sido eliminado exitosamente`,
				});
				setInitStateDelete(); //Seteo los errores y el succes a su estado inicial
				reloadFetchData(); //Vuelvo hacer el llamado de la data
			}
			if (errorDelete) {
				console.error(errorDelete);
			}
		}
	}, [successDelete, errorDelete]);

	const deleteFetchData = async (id: string) => {
		try {
			const token = localStorage.getItem("rt__grifosBackoffice"); // Obteniendo el token JWT del localStorage
			const headers = {
				Authorization: `Bearer ${token}`,
			};

			await axios.delete(`${url}${endPoint}/${id}`, { headers });

			setSuccessDelete(true);
			setIsLoadingDelete(false);
		} catch (error) {
			console.error(error);
			setErrorDelete(error);
			setIsLoadingDelete(false);
		}
	};

	return {
		deleteFetchData,
		isLoadingDelete,
	};
};
