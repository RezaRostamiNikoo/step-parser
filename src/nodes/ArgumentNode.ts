import { ExpressionNode } from "./ExpressionNode";
import { IndexNode } from './IndexNode';
import { NodeType } from "./NodeType";
import { IfcModel } from '../objects/IfcModel';

export class ArgumentNode extends ExpressionNode {
    get Type(): NodeType { return 'ArgumentNode'; }

    constructor(private nodes: Array<ExpressionNode>) {
        super();

    }

    toString(): string { return `(${this.nodes.map(n => n.toString()).join(", ")})`; }

    private _values: Array<any>

    getValue(): Array<any> {
        if (this._values) return this._values
        return this._values = this.nodes.map(node => node.getValue())
    }

}