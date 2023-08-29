import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";

export class UnsetNode extends ExpressionNode {
    get Type(): NodeType { return 'UnsetNode'; }

    constructor() {
        super();
    }
    toString(): string { return '$'; }

}