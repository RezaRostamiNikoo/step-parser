import { NodeType } from "./NodeType";
import { IfcModel } from '../objects/IfcModel';

export abstract class ExpressionNode {
    abstract get Type(): NodeType;


    private _tree: IfcModel
    get tree(): IfcModel { return this._tree }
    set tree(value: IfcModel) { this._tree = value }


    abstract toString(): string;

    abstract getValue(): any;
}