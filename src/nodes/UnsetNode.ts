import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";
import { IfcModel } from '../objects/IfcModel';

export class UnsetNode extends ExpressionNode {
    get Type(): NodeType { return 'UnsetNode'; }

    constructor() {
        super();
    }
    toString(): string { return '$'; }

    getValue() {
        return null
    }

}