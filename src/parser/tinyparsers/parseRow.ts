import { ExpressionNode } from "@nodes/ExpressionNode";
import { parseIndex } from "./parseIndex";

/**
 * Parse a single comma-separated row from a matrix, like 'a, b, c'
 * @return {ArrayNode} node
 */
export function parseRow(state): Array<ExpressionNode> {
    const params: Array<ExpressionNode> = [parseIndex(state)]

    while (state.isToken(',')) { // eslint-disable-line no-unmodified-loop-condition
        state.goAHead();
        // parse expression
        params.push(parseIndex(state));
    }

    return params;
}