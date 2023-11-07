import { ExpressionNode } from "@nodes";
import { State } from "../State";
import { parseClass } from "./parseClass";
import { DefinitionNode } from "@nodes/DefinitionNode";
import { IndexNode } from "@nodes/IndexNode";

export function parseIndex(state: State): ExpressionNode {
    if (state.isType('INDEXCODE')) {
        let index = state.token.Value;
        state.goAHead();
        if (state.isToken('=')) {
            state.goAHead()
            return new DefinitionNode(new IndexNode(index), parseClass(state) as ClassNode);
        }
        else return new IndexNode(index)
    }

    return parseClass(state);
}