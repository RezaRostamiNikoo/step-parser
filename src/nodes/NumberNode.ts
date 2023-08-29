import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";

export class NumberNode extends ExpressionNode {
    get Type(): NodeType { return 'NumberNode'; }

    constructor(private value: string) {
        super();
    }


    toString(): string { return `${this.value}`; }
}