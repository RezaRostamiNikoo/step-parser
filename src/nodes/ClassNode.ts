import { createIfcClass } from "../"
import { ArgumentNode } from "./ArgumentNode";
import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";

import * as IFC4x1 from 'ifc-schema-ts'
import { IfcModel } from '../objects/IfcModel';


export class ClassNode extends ExpressionNode {
    private _value: any

    constructor(private className: string, private args: ArgumentNode) {
        super();
        if (args.Type !== 'ArgumentNode')
            throw new Error("ClassNode.constructor | args should be ArgumentNode");
    }

    get Type(): NodeType { return 'ClassNode'; }

    toString(): string { return `${this.className}${this.args.toString()}`; }

    getValue() {
        if (this._value) return this._value
        return this._value = createIfcClass(this.className, this.args.getValue())
    }
}