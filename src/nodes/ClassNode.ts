import { ArgumentNode } from "./ArgumentNode";
import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";

export class ClassNode extends ExpressionNode {
    get Type(): NodeType { return 'ClassNode'; }

    constructor(private className: string, private args: ArgumentNode) {
        super();
        if (args.Type !== 'ArgumentNode')
            throw new Error("ClassNode.constructor | args should be ArgumentNode");
    }

    toString(): string { return `${this.className}${this.args.toString()}`; }

}