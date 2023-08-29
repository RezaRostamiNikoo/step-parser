import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";

export class ArrayNode extends ExpressionNode {
    get Type(): NodeType { return 'ArrayNode'; }

    constructor(private nodes: Array<ExpressionNode>) {
        super();
    }

    toString(): string { return `(${this.nodes.map(n => n.toString()).join(", ")})`; }

}