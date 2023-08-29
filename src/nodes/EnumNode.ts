import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";

export class EnumNode extends ExpressionNode {
    get Type(): NodeType { return 'EnumNode'; }

    constructor(private value: string) {
        super();
    }


    toString(): string { return this.value; }

}