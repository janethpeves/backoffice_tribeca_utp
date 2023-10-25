import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "@/connections/mainApi.js";

export const useUpdateFetch = (
	endPoint: string,
	toastRef: any,
	addModal: any,
	reloadFetchData: () => void,
	sectionName: string
) => {
	const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
	const [errorUpdate, setErrorUpdate] = useState<any>(null);
	const [successUpdate, setSuccessUpdate] = useState<boolean>(false);

	const setInitStateUpdate = () => {
		setIsLoadingUpdate(false);
		setErrorUpdate(null);
		setSuccessUpdate(false);
	};

	useEffect(() => {
		if (toastRef) {
			if (successUpdate) {
				toastRef.current?.show({
					severity: "success",
					summary: `${sectionName} Actualizado`,
					detail: `${sectionName} ha sido actualizado exitosamente`,
				});
				addModal.onHideModal();
				setInitStateUpdate(); //Seteo los errores y el succes a su estado inicial
				reloadFetchData(); //Vuelvo hacer el llamado de la data
			}
			if (errorUpdate) {
				console.error(errorUpdate);
			}
		}
	}, [successUpdate, errorUpdate]);

	const updateFetchData = async (id: string, data: any): Promise<any> => {
		try {
			setIsLoadingUpdate(true);

			const token = localStorage.getItem("rt__grifosBackoffice"); // Obteniendo el token JWT del localStorage
			const headers = {
				Authorization: `Bearer ${token}`,
			};

			await axios.patch(`${url}${endPoint}/${id}`, data, {
				headers,
			});

			setIsLoadingUpdate(false);
			setSuccessUpdate(true);
		} catch (error) {
			setIsLoadingUpdate(false);
			setErrorUpdate(error);
		}
	};

	return {
		updateFetchData,
		isLoadingUpdate,
	};
};
