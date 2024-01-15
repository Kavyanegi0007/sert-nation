const ReferralAction = {
	getReferrals: 1,
	addToList: 2,
	updateState: 3,
	removeFromList: 4,

	requestTransfer: 5,

	checkReferral: 6,
	applyForReferral: 7,
};

Object.freeze(ReferralAction);

export default ReferralAction;
