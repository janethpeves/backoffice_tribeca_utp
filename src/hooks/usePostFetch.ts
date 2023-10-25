import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { url } from "@/connections/mainApi.js";

interface PostDataResponse {
	data: any;
}

export const usePostFetch = (
	endPoint: string,
	toastRef: any,
	addModal: any,
	reloadFetchData: () => void,
	sectionName: string
) => {
	const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
	const [errorPost, setErrorPost] = useState<any>(null);
	const [successPost, setSuccessPost] = useState<boolean>(false);

	const setInitStatePost = () => {
		setIsLoadingPost(false);
		setErrorPost(null);
		setSuccessPost(false);
	};

	useEffect(() => {
		if (toastRef) {
			if (successPost) {
				toastRef.current?.show({
					severity: "success",
					summary: `${sectionName} Agregado`,
					detail: `${sectionName} ha sido agregado exitosamente`,
				});
				addModal.onHideModal();
				setInitStatePost(); //Seteo los errores y el succes a su estado inicial
				reloadFetchData(); //Vuelvo hacer el llamado de la data
			}
			if (errorPost) {
				console.error(errorPost);
			}
		}
	}, [successPost, errorPost]);

	const postFetchData = async (data: any, query?: string): Promise<any> => {
		try {
			setIsLoadingPost(true);

			const token = localStorage.getItem("rt__grifosBackoffice"); // Obteniendo el token JWT del localStorage
			const headers = {
				Authorization: `Bearer ${token}`,
			};

			const resp: AxiosResponse<PostDataResponse> = await axios.post(
				`${url}${endPoint}${query ? `?${query}` : ""}`,
				data,
				{
					headers,
				}
			);

			setIsLoadingPost(false);
			setSuccessPost(true);

			return resp.data.data; //es necesario?
		} catch (error) {
			setIsLoadingPost(false);
			setErrorPost(error);
		}
	};

	return {
		postFetchData,
		isLoadingPost,
	};
};
