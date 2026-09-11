#!/usr/bin/env node
import { isTypeAliasDeclaration } from "typescript/unstable/ast";
import { API, TypeFlags } from "typescript/unstable/async";

const api = new API();

const snapshot = await api.updateSnapshot({ openProjects: ["./tsconfig.json"] });
const project = snapshot.getProject("./tsconfig.json");
const sourceFile = await project?.program.getSourceFile("./fixture.ts");
const statement = sourceFile?.statements.find(isTypeAliasDeclaration);

const type = await project?.checker.getTypeAtLocation(statement);

if (type != null && type.flags & TypeFlags.String) {
	process.stdout.write("pass\n");
} else {
	process.stderr.write("fail\n");
}

api.close();
