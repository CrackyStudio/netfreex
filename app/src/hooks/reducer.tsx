// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Reducer = (state: any, action: any): any => {
	return {
		...state,
		[action.key]: action.value
	};
};
