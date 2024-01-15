import AuthAction from "./action";

const AuthReducer = (state, action) => {
	const { payload, type } = action;

	switch (type) {
		case AuthAction.begin:
			return {
				...state,
				loading: true,
			};

		case AuthAction.end:
			return {
				...state,
				...payload,
				loading: false,
			};

		case AuthAction.setUser:
			console.log(payload);
			return {
				...state,
				user: { ...payload },
			};

		case AuthAction.updateSignupState:
			console.log(payload);
			return {
				...state,
				signup: { ...payload },
			};

		case AuthAction.updateVerifyState:
			return {
				...state,
				verify: { ...payload },
			};

		case AuthAction.updateResendState:
			return {
				...state,
				resend: { ...payload },
			};

		case AuthAction.updateLoginState:
			return {
				...state,
				login: { ...payload },
			};

		case AuthAction.logout: {
			window.localStorage.clear();

			return {
				...state,
				isLoggedIn: false,
				isVerified: false,
				user: null,
			};
		}

		default:
			return state;
	}
};

export default AuthReducer;
