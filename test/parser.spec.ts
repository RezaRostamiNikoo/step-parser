import { Parser } from "../src";
import { readFileSync } from "fs";

// const sampleIfc = readFileSync("sample.ifc", "utf-8");
const sampleIfc = readFileSync("./test/dental clinic.ifc", "utf-8");


describe("Parser testing", () => {
    test("test number 1", () => {
        const parser = new Parser(sampleIfc);
        const model = parser.parse();
        console.log(model.toString());
    })
})