import { ExpressionNode } from "@nodes/ExpressionNode"
import { State } from "../State"
import { NumberNode } from "@nodes/NumberNode";
import { parseUnary } from "./parseUnary";

/**
 * parse a number
 * @return {ExpressionNode} node
 * @private
 */
export function parseNumber(state: State): ExpressionNode {
    let numberStr
    if (state.isType("NUMBER")) {
        // this is a number
        numberStr = state.token.Value
        state.goAHead();
        return new NumberNode(numberStr);
    }
    if (state.isToken('-') || state.isToken('+')) {

    }
    return parseUnary(state)
}