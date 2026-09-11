import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { runMain } from "./runMain.js";

const testFileName = path.basename(import.meta.filename);

for (let i = 0; i <= 9; i++) {
	test(`${i}-${testFileName}`, async () => {
		const result = await runMain();

		assert.equal(result.stderr, "");
		assert.equal(result.stdout, "pass\n");
		assert.equal(result.status, 0);
	});
}
