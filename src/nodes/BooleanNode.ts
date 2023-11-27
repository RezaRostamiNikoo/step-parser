import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";

export class BooleanNode extends ExpressionNode {
    get Type(): NodeType { return 'BooleanNode'; }

    constructor(private value: string) {
        super();
        if (![".TRUE.", ".FALSE.", ".F.", ".T."].includes(value))
            throw new Error(`BooleanNode.constructor | "${value} should not be considered as a boolean value"`)
    }


    toString(): string { return this.value; }

    getValue() {
        return
    }
}