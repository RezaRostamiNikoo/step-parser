import { IfcModel, Parser } from "../src";
import { readFileSync, writeFileSync } from "fs";
import * as IFC4 from "ifc-schema-ts"

// const sampleIfc = readFileSync("./test/sample.ifc", "utf-8");
// const sampleIfc = readFileSync("./test/resources/simple.ifc", "utf-8");
const sampleIfc = readFileSync("./test/resources/dental_clinic.ifc", "utf-8");

describe("Parser testing", () => {
    // test("test number 1", () => {
    //     const parser = new Parser(sampleIfc);
    //     const model = parser.parse();
    //     // console.log(model.toString());
    //     writeFileSync("./test/results/generated_file.ifc", model.toString())
    // })

    test('test values', () => {
        const parser = new Parser(sampleIfc);
        const model = parser.parse() as IfcModel;
        expect(model.getValues().length).toEqual(140145)
        expect(model.getEntities("IfcWall").length).toEqual(94)

        // console.log(model.getObjectProperties("1Z_dAOEEH21BB2WjMfkuFV" as unknown as IFC4.IfcGloballyUniqueId))
        const objs = model.getObjectDefinitions()
        const result: IFC4.IfcObjectDefinition[] = []
        objs.forEach(obj => {
            if (!model.hasPropertySet(obj, "UniClassId")) {
                result.push(obj)
            }
        })
        console.log(result)

    })

})