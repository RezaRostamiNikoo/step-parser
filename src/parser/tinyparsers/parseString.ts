import { ExpressionNode } from "@nodes";
import { State } from "../State";
import { parseEnum } from "./parseEnum";
import { StringNode } from "@nodes/StringNode";

export function parseString(state: State): ExpressionNode {
    if (state.isType('STRING')) {
        const strval = state.token.Value;
        state.goAHead();
        return new StringNode(strval.substring(1, strval.length - 1)) // the reason why string is being cut at the start and the end is token parser is reading the text with " ' "  character
    }

    return parseEnum(state);
}
