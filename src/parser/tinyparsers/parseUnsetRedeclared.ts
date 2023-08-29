import { ExpressionNode } from "@nodes/ExpressionNode"
import { State } from "../State"
import { parseEnd } from "./parseEnd";
import { UnsetNode } from "@nodes/UnsetNode";
import { RedeclareNode } from "@nodes/RedeclareNode";

/**
 * parse a number
 * @return {ExpressionNode} node
 * @private
 */
export function parseUnsetRedeclared(state: State): ExpressionNode {
    if (state.isType("UNSET")) {
        state.goAHead();
        return new UnsetNode();
    }
    if (state.isType('REDECLARED')) {
        state.goAHead();
        return new RedeclareNode();
    }
    return parseEnd(state)
}