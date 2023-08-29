import { ExpressionNode } from "@nodes";
import { State } from "../State";
import { parseArray } from "./parseArray";
import { ClassNode } from "@nodes/ClassNode";
import { parseArgument } from "./parseArgument";

export function parseClass(state: State): ExpressionNode {
    if (state.isType('CLASS')) {
        const val = state.token.Value;
        state.goAHead();
        return new ClassNode(val, parseArgument(state));
    }

    return parseArray(state);
}