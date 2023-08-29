import { ExpressionNode } from "@nodes/ExpressionNode"
import { State } from "../State"
import { EnumNode } from "@nodes/EnumNode";
import { parseNumber } from "./parseNumber";
import { BooleanNode } from "@nodes";

/**
 * parse a number
 * @return {ExpressionNode} node
 * @private
 */
export function parseEnum(state: State): ExpressionNode {
    let strVal: string;
    if (state.isType("ENUM")) {
        strVal = state.token.Value;
        state.goAHead();
        if (strVal === ".TRUE." || strVal === ".FALSE.") return new BooleanNode(strVal);
        return new EnumNode(strVal);
    }
    return parseNumber(state);
}