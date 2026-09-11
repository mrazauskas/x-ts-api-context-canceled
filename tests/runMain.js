import { spawn } from "node:child_process";
import path from "node:path";

export const mainFilePath = path.resolve("./main.js");

export function runMain() {
	return new Promise((resolve, reject) => {
		const child = spawn(process.execPath, [mainFilePath], { shell: true });

		child.stdout.setEncoding("utf8");
		child.stderr.setEncoding("utf8");

		let stdout = "";
		let stderr = "";

		child.stdout.on("data", (chunk) => {
			stdout += chunk;
		});

		child.stderr.on("data", (chunk) => {
			stderr += chunk;
		});

		child.on("error", reject);

		child.on("close", (status) => {
			resolve({ stdout, stderr, status });
		});
	});
}
