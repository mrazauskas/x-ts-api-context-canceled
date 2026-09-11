#!/usr/bin/env node
import { isTypeAliasDeclaration } from "typescript/unstable/ast";
import { API, TypeFlags } from "typescript/unstable/sync";

const api = new API();

const snapshot = api.updateSnapshot({ openProjects: ["./tsconfig.json"] });
const project = snapshot.getProject("./tsconfig.json");
const sourceFile = project?.program.getSourceFile("./fixture.ts");
const statement = sourceFile?.statements.find(isTypeAliasDeclaration);

const type = project?.checker.getTypeAtLocation(statement);

if (type != null && type.flags & TypeFlags.String) {
	process.stdout.write("pass\n");
} else {
	process.stderr.write("fail\n");
}

api.close();
