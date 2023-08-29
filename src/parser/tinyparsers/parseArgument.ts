import { State } from "../State";
import { CharacterExpected } from "@errors/index";
import { ArgumentNode } from "@nodes/ArgumentNode";
import { parseRow } from "./parseRow";

export function parseArgument(state: State): ArgumentNode {

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

            return new ArgumentNode(array);
        } else {
            // this is an empty argument "( )"
            state.prevLevel();
            state.goAHead();
            return new ArgumentNode([])
        }
    }
}