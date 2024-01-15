import VideoAction from "./action";

const VideoReducer = (state, action) => {
	const { payload, type } = action;

	switch (type) {
		case VideoAction.addToList:
			return {
				...state,
				videos: [...payload],
			};

		case VideoAction.setLoading:
			return {
				...state,
				...payload,
			};

		default:
			return state;
	}
};

export default VideoReducer;
