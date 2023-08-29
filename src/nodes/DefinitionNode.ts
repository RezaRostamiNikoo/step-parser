import { IndexNode } from "./IndexNode";
import { ClassNode } from "./ClassNode";
import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";

export class DefinitionNode extends ExpressionNode {

    get Type(): NodeType { return 'DefinitionNode'; }

    constructor(private index: IndexNode, private node: ExpressionNode) {
        super();
        if (node.Type !== 'ClassNode')
            throw new Error("DefinitionNode.constructor | node should be ClassNode");
        if (index.Type !== 'IndexNode')
            throw new Error("DefinitionNode.constructor | index should be IndexNode");
    }

    get Index(): IndexNode { return this.index; }
    toString(): string { return `${this.index.toString()}= ${this.node.toString()}`; }

}