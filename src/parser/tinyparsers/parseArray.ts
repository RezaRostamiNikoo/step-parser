import { ExpressionNode } from "@nodes";
import { State } from "../State";
import { ArrayNode } from "@nodes/ArrayNode";
import { CharacterExpected } from "@errors/index";
import { parseString } from "./parseString";
import { parseRow } from "./parseRow";

export function parseArray(state: State): ExpressionNode {
    let node

    if (state.isToken('(')) {
        // matrix [...]
        state.goAHead();
        state.nextLevel();

        if (!state.isToken(')')) {
            // this is a non-empty matrix
            const array = parseRow(state)
            // 1 dimensional vector
            if (!state.isToken(')')) {
                throw new CharacterExpected(state.Expression.Text.Text, state.Expression.Text.Head, ")")
            }
            state.prevLevel();
            state.goAHead();

            return new ArrayNode(array);
        } else {
            // this is an empty array "( )"
            state.prevLevel();
            state.goAHead();
            return new ArrayNode([])
        }
    }
    return parseString(state);
}