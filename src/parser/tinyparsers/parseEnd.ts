import { UnexpectedEnd, anyCharacterExpected } from "@errors"
import { ExpressionNode } from "@nodes"
import { State } from "../State"

/**
 * Evaluated when the expression is not yet ended but expected to end
 * @return {ExpressionNode} res
 * @private
 */
export function parseEnd(state: State): ExpressionNode {
    if (!state.token) {
        // syntax error or unexpected end of expression
        throw new UnexpectedEnd();
    } else {
        throw new anyCharacterExpected(state.Expression.Text.Text, state.Expression.Text.Head);
    }
}