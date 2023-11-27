import { State } from "../src/parser/State";

describe("State testing", () => {
    test("test 1", () => {
        const state = new State(
            "#44767= IFCCARTESIANPOINT((#2324,IFCCARTESIANPOINT((2.54077722359665,2.54077722359719,10.1600000000004),$),2.54077722359719,10.1600000000004),$);"
        );

        expect(state.token.Value).toEqual("#44767")
        expect(state.goAHead().token.Value).toEqual("=")
        expect(state.goAHead().token.Value).toEqual("IFCCARTESIANPOINT")
        expect(state.goAHead().token.Value).toEqual("(")
        expect(state.goAHead().token.Value).toEqual("(")
        expect(state.goAHead().token.Value).toEqual("#2324")
        expect(state.goAHead().token.Value).toEqual(",")
        expect(state.goAHead().token.Value).toEqual("IFCCARTESIANPOINT")
        expect(state.goAHead().token.Value).toEqual("(")
        expect(state.goAHead().token.Value).toEqual("(")
        expect(state.goAHead().token.Value).toEqual("2.54077722359665")
        expect(state.goAHead().token.Value).toEqual(",")
        expect(state.goAHead().token.Value).toEqual("2.54077722359719")
        expect(state.goAHead().token.Value).toEqual(",")
        expect(state.goAHead().token.Value).toEqual("10.1600000000004")
        expect(state.goAHead().token.Value).toEqual(")")
        expect(state.goAHead().token.Value).toEqual(",")
        expect(state.goAHead().token.Value).toEqual("$")
        expect(state.goAHead().token.Value).toEqual(")")
        expect(state.goAHead().token.Value).toEqual(",")
        expect(state.goAHead().token.Value).toEqual("2.54077722359719")
        expect(state.goAHead().token.Value).toEqual(",")
        expect(state.goAHead().token.Value).toEqual("10.1600000000004")
        expect(state.goAHead().token.Value).toEqual(")")
        expect(state.goAHead().token.Value).toEqual(",")
        expect(state.goAHead().token.Value).toEqual("$")
        expect(state.goAHead().token.Value).toEqual(")")
        expect(state.goAHead().token.Value).toEqual(";")
    });
});