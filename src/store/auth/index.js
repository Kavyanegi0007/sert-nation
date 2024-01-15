import React, { createContext, useCallback, useReducer } from "react";
import AuthAction from "./action";
import AuthMethods from "./methods";
import AuthReducer from "./reducer";

const initialState = {
	loading: true,
	isLoggedIn: false,
	isVerified: false,
	user: null,

	login: {
		loading: false,
		error: "",
	},

	signup: {
		loading: false,
		error: "",
	},

	verify: {
		loading: false,
		error: "",
	},

	resend: {
		loading: false,
		error: "",
	},
};

const AuthStore = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, initialState);

	const customDispatch = useCallback(async (action) => {
		const { payload, type } = action;

		switch (type) {
			case AuthAction.authenticate: {
				console.log("Authenticating user");

				const { isLoggedIn, user } = await AuthMethods.authenticate();
				console.log({ isLoggedIn, user });

				dispatch({
					type: AuthAction.end,
					payload: { isLoggedIn, user },
				});

				break;
			}

			case AuthAction.login: {
				console.log("Logging  in", payload);

				dispatch({ type: AuthAction.updateLoginState, payload: { loading: true, error: "" } });

				const { error, isLoggedIn, user } = await AuthMethods.login(
					payload.data,
					payload.onNotVerified,
				);
				if (error) {
					dispatch({
						type: AuthAction.updateLoginState,
						payload: { loading: false, error: error },
					});
				} else {
					dispatch({ type: AuthAction.updateLoginState, payload: { loading: false, error: "" } });
					dispatch({ type: AuthAction.end, payload: { isLoggedIn, user } });
					payload.callback();
				}
				break;
			}

			case AuthAction.signup: {
				console.log("Signing up", payload);

				dispatch({ type: AuthAction.updateSignupState, payload: { loading: true, error: "" } });

				const { error } = await AuthMethods.signup(payload.data);
				if (error) {
					dispatch({
						type: AuthAction.updateSignupState,
						payload: { loading: false, error: error },
					});
				} else {
					dispatch({ type: AuthAction.updateSignupState, payload: { loading: false, error: "" } });
					payload.callback();
				}
				break;
			}

			case AuthAction.verify: {
				console.log("Verifying", payload);

				dispatch({ type: AuthAction.updateVerifyState, payload: { loading: true, error: "" } });

				const { error, isLoggedIn, user } = await AuthMethods.verify(
					payload.data,
					payload.callback,
				);
				if (error) {
					dispatch({ type: AuthAction.updateVerifyState, payload: { loading: false, error } });
				} else {
					dispatch({ type: AuthAction.updateVerifyState, payload: { loading: false, error: "" } });
					dispatch({ type: AuthAction.end, payload: { isLoggedIn, user } });
					payload.callback();
				}
				break;
			}

			case AuthAction.resendOtp: {
				console.log("Resending Otp", payload);

				dispatch({ type: AuthAction.updateResendState, payload: { loading: true, error: "" } });

				const { error } = await AuthMethods.resendOtp(payload.data);
				if (error) {
					dispatch({
						type: AuthAction.updateResendState,
						payload: { loading: false, error: error },
					});
				} else {
					dispatch({ type: AuthAction.updateResendState, payload: { loading: false, error: "" } });
				}
				break;
			}

			default:
				dispatch(action);
		}
	}, []);

	return <AuthContext.Provider value={[state, customDispatch]}>{children}</AuthContext.Provider>;
};

export const AuthContext = createContext(initialState);
export default AuthStore;
