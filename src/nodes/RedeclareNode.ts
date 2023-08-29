import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";

export class RedeclareNode extends ExpressionNode {
    get Type(): NodeType { return 'RedeclareNode'; }

    constructor() {
        super();
    }
    toString(): string { return '*'; }

}