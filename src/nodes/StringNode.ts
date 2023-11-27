import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";
import { IfcModel } from '../objects/IfcModel';

export class StringNode extends ExpressionNode {
    get Type(): NodeType { return 'StringNode'; }

    constructor(private value: string) {
        super();
    }


    toString(): string { return this.value; }

    getValue() {
        return this.value
    }

}