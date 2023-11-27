import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";

export class EnumNode extends ExpressionNode {
    get Type(): NodeType { return 'EnumNode'; }

    constructor(private value: string) {
        if ([".TRUE.", ".FALSE.", ".F.", ".T."].includes(value))
            throw new Error(`EnumNode.constructor | "${value} should not be considered as a enum value"`)

        super();
    }


    toString(): string { return this.value; }

    getValue() {
        return this.value
    }
}