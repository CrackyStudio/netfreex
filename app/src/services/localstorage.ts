export default {
	getState: (key: string): any => {
		return localStorage.getItem(key);
	},

	setState: (key: string, value: any): any => {
		localStorage.setItem(key, value);
	}
};
