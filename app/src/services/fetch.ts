const { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } = process.env;
const API = `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}` as string;

const get = async (subUrl: string): Promise<any> => {
	const url = `${API}/${subUrl}`
	try {
		const response = await fetch(url, {
			method: 'GET',
		});
		return response.json();
	} catch (errors) {
		console.log(errors);
	}
};

export default {
	getFilms: (): any => get(`films`),
	getSeries: (): any => get(`series`),
	getSeasons: (serie: string): any => get(`series/${serie}`),
	getEpisodes: (serie: string, season: string): any => get(`series/${serie}/${season}`)
};
