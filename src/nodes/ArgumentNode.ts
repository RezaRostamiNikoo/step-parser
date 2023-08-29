import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";

export class ArgumentNode extends ExpressionNode {
    get Type(): NodeType { return 'ArgumentNode'; }

    constructor(private nodes: Array<ExpressionNode>) {
        super();

    }

    toString(): string { return `(${this.nodes.map(n => n.toString()).join(", ")})`; }

}