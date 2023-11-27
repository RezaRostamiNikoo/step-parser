import { Parser } from './parser';

export * from "./parser";
export * from "./nodes";
export * from "./errors";
export * from "./helpers";
export * from "./objects";



export function parse(text: string, version: "IFC4x1") {
    const parser = new Parser(text);
    const ifcModel = parser.parse()

    if (version !== "IFC4x1") throw new Error("Other IfC version are not supported yet")



}