import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";
import { IfcModel } from '../objects/IfcModel';

export class ArrayNode extends ExpressionNode {
    get Type(): NodeType { return 'ArrayNode'; }

    constructor(private nodes: Array<ExpressionNode>) {
        super();
    }

    toString(): string { return `(${this.nodes.map(n => n.toString()).join(", ")})`; }

    private _values: Array<any>

    getValue(): Array<any> {
        if (this._values) return this._values
        return this._values = this.nodes.map(n => n.getValue())
    }

}