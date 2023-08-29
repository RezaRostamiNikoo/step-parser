import { ExpressionNode } from "@nodes/ExpressionNode"
import { State } from "../State"
import { parseUnsetRedeclared } from "./parseUnsetRedeclared";
import { NumberNode } from "@nodes/NumberNode";
import { NumberExpected } from "@errors/index";

/**
 * parse a number
 * @return {ExpressionNode} node
 * @private
 */
export function parseUnary(state: State): ExpressionNode {
    let numberStr

    if (state.isToken('-') || state.isToken('+')) {
        const sign = state.token.Value;
        state.goAHead()
        if (!state.isType("NUMBER")) throw new NumberExpected(state.Expression.Text.Text, state.Expression.Text.Head);
        // this is a number
        numberStr = state.token.Value
        state.goAHead();
        return new NumberNode(sign + numberStr);
    }
    return parseUnsetRedeclared(state)
}