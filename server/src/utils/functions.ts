import { statSync } from "fs";

export function sortByDate(dir: string, files: string[]): string[] {
	return files
		.map(function(v) {
			return { name: v, time: statSync(dir + "/" + v).mtime.getTime() };
		})
		.sort(function(a, b) {
			return b.time - a.time;
		})
		.map(function(v) {
			return v.name;
		});
}
