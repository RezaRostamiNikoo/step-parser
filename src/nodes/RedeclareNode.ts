import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";
import { IfcModel } from '../objects/IfcModel';

export class RedeclareNode extends ExpressionNode {
    get Type(): NodeType { return 'RedeclareNode'; }

    constructor() {
        super();
    }
    toString(): string { return '*'; }

    getValue() {
        return undefined
    }

    
}