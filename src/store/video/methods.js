import AuthWebClient from "../../core/axios/auth-web-client";

const VideoMethods = {
	getVideos: async (userId) => {
		try {
			const response = await AuthWebClient.get(`/api/user/${userId}/video`, {
				withCredentials: true,
			});

			return { videos: response.data };
		} catch (error) {
			if (error.response.status === 402) return { notPurchased: true };
			return { error: true };
		}
	},
};

export default VideoMethods;
