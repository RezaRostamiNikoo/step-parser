import { ExpressionNode } from "@nodes";

export class IFCModel {
    private header: Array<ExpressionNode>;
    private data: Map<string, ExpressionNode>;


    constructor(header: Array<ExpressionNode>, data: Map<string, ExpressionNode>) {
        this.header = header;
        this.data = data;
    }




    toString(): string {
        const result: string[] = [];
        result.push("ISO-10303-21;\n");
        result.push("HEADER;\n");
        this.header.forEach(h => result.push(h.toString() + ";"))
        result.push("\nENDSEC;\n\n");
        result.push("DATA;\n");
        this.data.forEach(d => result.push(d.toString() + ";"))
        result.push("\nENDSEC;\n\n");
        result.push("END-ISO-10303-21;");
        return result.join("\n");
    }

}