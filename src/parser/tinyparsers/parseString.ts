import { ExpressionNode } from "@nodes";
import { State } from "../State";
import { parseEnum } from "./parseEnum";
import { StringNode } from "@nodes/StringNode";

export function parseString(state: State): ExpressionNode {
    if (state.isType('STRING')) {
        const strval = state.token.Value;
        state.goAHead();
        return new StringNode(strval)
    }

    return parseEnum(state);
}
