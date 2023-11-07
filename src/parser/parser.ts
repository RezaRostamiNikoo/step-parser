

import { ExpressionNode } from "@nodes";
import { State } from "./State";
import { parseIndex } from "./tinyparsers/parseIndex";
import { IFCModel } from "../IFCModel";
import { DefinitionNode } from "@nodes/DefinitionNode";

function removeComments(text: string): Array<string> {
    let tt = text.replace(/;[\r|\n]/gs, ';;;');
    tt = tt.replace(/\/\*.*?\*\//gs, '');
    tt = tt.replace(/\s{1,}\r\s{1,}/gs, '');
    tt = tt.replace(/\s{1,}\n\s{1,}/gs, '');
    return tt.split(';;;');
}
export class LineParser {
    state: State;


    constructor(private lineText: string) {

    }

    /**
     * Start of the parse levels below, in order of precedence
     * @return {Node} node
     * @private
     */
    parse(): ExpressionNode {
        this.state = new State(this.lineText);
        if (!this.state.token) return undefined; // return a StringNode
        return parseIndex(this.state);
    }
}

export class Parser {
    private text: Array<string>;

    constructor(text: string) {
        this.text = removeComments(text);
    }

    private splitlines() {
        const result = {
            data: [],
            header: []
        }
        let isDoingHeader: boolean = false;
        let isDoingData: boolean = false;
        this.text.forEach(line => {
            let shouldBeAdded: boolean = true;
            if (line.trim() === "HEADER") {
                isDoingData = false;
                isDoingHeader = true;
                shouldBeAdded = false;
            } else if (line.trim() === "DATA") {
                isDoingData = true;
                isDoingHeader = false;
                shouldBeAdded = false;
            } else if (line.trim() === "ENDSEC") {
                isDoingData = false;
                isDoingHeader = false;
                shouldBeAdded = false;
            }

            if (shouldBeAdded && isDoingData) result.data.push(line.trim());
            else if (shouldBeAdded && isDoingHeader) {
                result.header.push(line.trim());
                // console.log(line.trim())
            }
        });
        return result;
    }

dd

    parse(): IFCModel {
        const header: Array<ExpressionNode> = [];
        const data: Map<string, DefinitionNode> = new Map();
        const rawData = this.splitlines();

        rawData.data.forEach(l => {
            const parser = new LineParser(l);
            const node: DefinitionNode = parser.parse() as DefinitionNode;
            if (node.Type === "DefinitionNode") {
                data.set(node.Index.toString(), node);
            }
        });

        rawData.header.forEach(l => {
            const parser = new LineParser(l);
            const node = parser.parse();
            header.push(node);
        });
        return new IFCModel(header, data);
    }
}