import { IndexNode } from "./IndexNode";
import { ClassNode } from "./ClassNode";
import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";
import { IfcModel } from '../objects/IfcModel';

export class DefinitionNode extends ExpressionNode {

    private _values: any

    constructor(private indexNode: IndexNode, private classNode: ClassNode) {
        super();
        if (classNode.Type !== 'ClassNode')
            throw new Error("DefinitionNode.constructor | node should be ClassNode");
        if (indexNode.Type !== 'IndexNode')
            throw new Error("DefinitionNode.constructor | index should be IndexNode");
    }

    get Index(): IndexNode { return this.indexNode; }
    get Type(): NodeType { return 'DefinitionNode'; }

    toString(): string { return `${this.indexNode.toString()}= ${this.classNode.toString()}`; }

    getValue() {
        if (this._values) return this._values
        return this._values = this.classNode.getValue()
    }
}