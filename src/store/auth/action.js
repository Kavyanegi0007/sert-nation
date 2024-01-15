const AuthAction = {
	begin: 1,
	end: 2,
	login: 3,
	authenticate: 4,
	setUser: 5,

	signup: 6,
	updateSignupState: 7,
	verify: 8,
	updateVerifyState: 9,
	resendOtp: 10,
	updateResendState: 11,
	updateLoginState: 12,

	logout: 13,
};

Object.freeze(AuthAction);

export default AuthAction;
