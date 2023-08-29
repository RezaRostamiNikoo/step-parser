import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";

export class StringNode extends ExpressionNode {
    get Type(): NodeType { return 'StringNode'; }

    constructor(private value: string) {
        super();
    }


    toString(): string { return this.value; }

}