import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";
import { IfcModel } from '../objects/IfcModel';

export class IndexNode extends ExpressionNode {
    get Type(): NodeType { return 'IndexNode'; }

    constructor(private id: string) {
        super();
    }

    toString(): string { return this.id; }

    getValue() {
        return IfcModel.model.Data.get(this.id).getValue()
    }

}