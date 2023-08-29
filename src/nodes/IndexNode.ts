import { ExpressionNode } from "./ExpressionNode";
import { NodeType } from "./NodeType";

export class IndexNode extends ExpressionNode {
    get Type(): NodeType { return 'IndexNode'; }

    constructor(private id: string) {
        super();
    }

    toString(): string { return this.id; }

}