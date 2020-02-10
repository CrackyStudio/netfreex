/* eslint-disable @typescript-eslint/no-explicit-any */
const API = `http://${process.env.REACT_APP_SERVER_IP}:4242/` as string;

const get = async (url: string): Promise<any> => {
	try {
		const response = await fetch(url, {
			method: 'GET',
		});
		return response.json();
	} catch (errors) {
		console.log(API)
		console.log(errors);
		throw errors;
	}
};

export default {
	getFilms: (): any => get(`${API}films`),
	getSeries: (): any => get(`${API}series`),
	getSeasons: (serie: string): any => get(`${API}series/${serie}`),
	getEpisodes: (serie: string, season: string): any => get(`${API}series/${serie}/${season}`)
};
