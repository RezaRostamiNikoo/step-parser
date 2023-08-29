import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";

export class BooleanNode extends ExpressionNode {
    get Type(): NodeType { return 'BooleanNode'; }

    constructor(private value: string) {
        super();
        if (value !== ".TRUE." && value !== ".FALSE.")
            throw new Error("BooleanNode.constructor | the value is bot boolean")
    }


    toString(): string { return this.value; }
}