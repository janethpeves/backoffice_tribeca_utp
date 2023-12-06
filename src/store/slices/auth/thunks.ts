import { AppThunk } from "../../store";
import { authApi } from "../../../connections";
import { isLoading, setLogin } from "./authSlice";

export const getUser = (payload: string): AppThunk => {
	return async (dispatch) => {
		try {
			const { data } = await authApi.post("/login", payload);
			localStorage.setItem("login__tribeca", data);

			dispatch(setLogin(data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const refreshLogin = (): AppThunk => {
	return async (dispatch) => {
		try {
			const loginStorage = localStorage.getItem("login__tribeca");
			dispatch(setLogin(loginStorage));
		} catch (error) {
			console.log(error);
			localStorage.removeItem("login__tribeca");
			dispatch(isLoading());
		}
	};
};

export const logoutUser = (): AppThunk => {
	return (dispatch) => {
		localStorage.removeItem("login__tribeca");
		dispatch(setLogin(null));
	};
};
