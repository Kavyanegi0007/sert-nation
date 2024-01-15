import React, { createContext, useCallback, useReducer } from "react";
import VideoAction from "./action";
import VideoMethods from "./methods";
import VideoReducer from "./reducer";

const initialState = {
	loading: true,
	error: false,
	notPurchased: false,
	videos: [],
};

const VideoStore = ({ children }) => {
	const [state, dispatch] = useReducer(VideoReducer, initialState);

	const customDispatch = useCallback(async (action) => {
		const { payload, type } = action;

		switch (type) {
			case VideoAction.getVideos: {
				dispatch({
					type: VideoAction.setLoading,
					payload: { loading: true, error: false, notPurchased: false },
				});

				const { error, notPurchased, videos } = await VideoMethods.getVideos(payload.userId);

				if (error) {
					dispatch({
						type: VideoAction.setLoading,
						payload: { loading: false, error: true, notPurchased: false },
					});
				} else if (notPurchased) {
					dispatch({
						type: VideoAction.setLoading,
						payload: { loading: false, error: false, notPurchased: true },
					});
				} else {
					dispatch({
						type: VideoAction.setLoading,
						payload: { loading: false, error: false, notPurchased: false },
					});
					dispatch({
						type: VideoAction.setLoading,
						payload: { loading: false, error: true, notPurchased: false },
					});
					dispatch({ type: VideoAction.addToList, payload: videos });
				}

				break;
			}

			default:
				dispatch(action);
		}
	}, []);

	return <VideoContext.Provider value={[state, customDispatch]}>{children}</VideoContext.Provider>;
};

export const VideoContext = createContext(initialState);
export default VideoStore;
