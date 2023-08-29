import { Parser, State } from "../src";
import { Expression } from "../src/parser/Expression";

describe("Expression testing", () => {

    test("test 1: simple class definition", () => {
        const expr = new Expression("#44767= IFCCARTESIANPOINT((2.54077722359665,2.54077722359719,10.1600000000004),$);")
        expect(expr.getNextToken().Value).toEqual("#44767");
        expect(expr.getNextToken().Value).toEqual("=");
        expect(expr.getNextToken().Value).toEqual("IFCCARTESIANPOINT");
        expect(expr.getNextToken().Value).toEqual("(");
        expect(expr.getNextToken().Value).toEqual("(");
        expect(expr.getNextToken().Value).toEqual("2.54077722359665");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("2.54077722359719");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("10.1600000000004");
        expect(expr.getNextToken().Value).toEqual(")");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("$");
        expect(expr.getNextToken().Value).toEqual(")");
        expect(expr.getNextToken().Value).toEqual(";");
    });
    test("test 1: class in class definition", () => {
        const expr = new Expression(
            "#44767= IFCCARTESIANPOINT((2.54077722359665,IFCCARTESIANPOINT((2.54077722359665,2.54077722359719,10.1600000000004),$),2.54077722359719,10.1600000000004),$);")
        expect(expr.getNextToken().Value).toEqual("#44767");
        expect(expr.getNextToken().Value).toEqual("=");
        expect(expr.getNextToken().Value).toEqual("IFCCARTESIANPOINT");
        expect(expr.getNextToken().Value).toEqual("(");
        expect(expr.getNextToken().Value).toEqual("(");
        expect(expr.getNextToken().Value).toEqual("2.54077722359665");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("IFCCARTESIANPOINT");
        expect(expr.getNextToken().Value).toEqual("(");
        expect(expr.getNextToken().Value).toEqual("(");
        expect(expr.getNextToken().Value).toEqual("2.54077722359665");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("2.54077722359719");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("10.1600000000004");
        expect(expr.getNextToken().Value).toEqual(")");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("$");
        expect(expr.getNextToken().Value).toEqual(")");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("2.54077722359719");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("10.1600000000004");
        expect(expr.getNextToken().Value).toEqual(")");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("$");
        expect(expr.getNextToken().Value).toEqual(")");
        expect(expr.getNextToken().Value).toEqual(";");
    });


    test("testing unary and exponential ability", () => {
        const expr = new Expression("(3e3,-3E+3,+3e-2)");
        expect(expr.getNextToken().Value).toEqual("(");
        expect(expr.getNextToken().Value).toEqual("3e3");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("-");
        expect(expr.getNextToken().Value).toEqual("3E+3");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("+");
        expect(expr.getNextToken().Value).toEqual("3e-2");
        expect(expr.getNextToken().Value).toEqual(")");

    });


    test("number 4", () => {
        const text = " \n\r\t  #28 = IFCSIUNIT(*,.LENGTHUNIT., $,.METRE.);  \r\n\t  "
        const expr = new Expression("   #28 = IFCSIUNIT(*,.LENGTHUNIT., $,.METRE.);    ");
        expect(expr.getNextToken().Value).toEqual("#28");
        expect(expr.getNextToken().Value).toEqual("=");
        expect(expr.getNextToken().Value).toEqual("IFCSIUNIT");
        expect(expr.getNextToken().Value).toEqual("(");
        expect(expr.getNextToken().Value).toEqual("*");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual(".LENGTHUNIT.");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("$");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual(".METRE.");
        expect(expr.getNextToken().Value).toEqual(")");
        expect(expr.getNextToken().Value).toEqual(";");
    })


    test("testing header parsing", () => {
        const text = "FILE_NAME('building_service_element_air-terminal.ifc', '2011-11-11T23:58:37', (''), (''), 'Constructivity 0.9.1', 'Constructivity 0.9.1', '');"
        const expr = new Expression(text);
        expect(expr.getNextToken().Value).toEqual("FILE_NAME");
        expect(expr.getNextToken().Value).toEqual("(");
        expect(expr.getNextToken().Value).toEqual("'building_service_element_air-terminal.ifc'");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("'2011-11-11T23:58:37'");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("(");
        expect(expr.getNextToken().Value).toEqual("''");
        expect(expr.getNextToken().Value).toEqual(")");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("(");
        expect(expr.getNextToken().Value).toEqual("''");
        expect(expr.getNextToken().Value).toEqual(")");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("'Constructivity 0.9.1'");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("'Constructivity 0.9.1'");
        expect(expr.getNextToken().Value).toEqual(",");
        expect(expr.getNextToken().Value).toEqual("''");
        expect(expr.getNextToken().Value).toEqual(")");
        expect(expr.getNextToken().Value).toEqual(";");
    })
});