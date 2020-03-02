const { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } = process.env;
const API = `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}` as string;

const get = async (subUrl: string): Promise<any> => {
	const url = `${API}/${subUrl}`;
	try {
		const response = await fetch(url, {
			method: "GET"
		});
		return response.json();
	} catch (errors) {
		console.log(errors);
	}
};

const post = async (subUrl: string, body = {} as any): Promise<any> => {
	const url = `${API}/${subUrl}`;
    try {
        let response = await fetch(
            url,
            {
				method: "POST" as string,
				headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } as any,
                body: body as any
            }
        );
        return response.json();
    } catch (errors) {
        console.log(errors);
    }
};

export default {
	createAccount: (body: any): any => post("users", JSON.stringify(body)),
	validate2FA: (body: any): any => post("validate-2FA", JSON.stringify(body)),
	getUser: (user: string): any => get(`users/nickname/${user}`),
	getFilms: (): any => get("films"),
	getSeries: (): any => get("series"),
	getSeasons: (serie: string): any => get(`series/${serie}`),
	getEpisodes: (serie: string, season: string): any => get(`series/${serie}/${season}`)
};
