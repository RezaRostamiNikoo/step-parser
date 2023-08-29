import { NodeType } from "./NodeType";

export abstract class ExpressionNode {
    abstract get Type(): NodeType;


    abstract toString(): string;

}