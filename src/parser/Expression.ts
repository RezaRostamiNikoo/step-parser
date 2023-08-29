import { EmptyExpressionError, UnknownToken } from "@errors";
import { Token } from "./Token";
import { TokenType } from "./types";
import { StringChar } from "./StringChar";
import { NumberExpected } from "../errors";


export type TokenReadingRule = {
    count: number,
    tokenType: TokenType
}

export class Expression {
    private text: StringChar;

    constructor(expression: string) {
        if (!expression) throw new EmptyExpressionError()
        this.text = new StringChar(expression);
    }

    get Text(): StringChar { return this.text; }
    /**
     * Get next token in the current string expr.
     * The token and token type are available as token and tokenType
     * @returns {Token} return a recognized token
     */
    getNextToken(): Token {

        this.text.skipIgnoredCharacters();
        if (this.isEnd()) return undefined
        const readRule: TokenReadingRule =
            this.isIndexCode() ||
            this.isDelimiter() ||
            this.isNumber() ||
            this.isString() ||
            this.isEnum() ||
            this.isClass() ||
            this.isUnset() ||
            this.isRedeclare();

        if (!readRule) throw new UnknownToken(this.text.Text, this.text.Head);
        return new Token(this.text.extractChar(readRule.count), readRule.tokenType, this.text.Head - readRule.count);
    }

    /**
     * it checks if there is any more character to checks. otherwise this means that it is at the end
     * @returns {boolean} true if it is the end 
     */
    isEnd(): boolean {
        if (this.text.isEnd()) return true;
        return false;
    }

    isDelimiter(): TokenReadingRule {
        if (this.text.isDelimiter()) {
            return {
                count: 1,
                tokenType: "DELIMITER",
            }
        }
        return undefined;
    }

    isIndexCode(): TokenReadingRule {
        if (this.text.currentIs("#")) {
            if (this.text.isDigit(1)) {
                return {
                    count: this.appendAllDigits(1),
                    tokenType: "INDEXCODE"
                };
            }
            throw new NumberExpected(this.text.Text, this.text.Head);
        }
        return undefined;
    }

    isString(): TokenReadingRule {
        if (this.text.currentIs('\'')) {
            const regex = new RegExp(/(?<=,|\(|)\s*'(.*?)'\s*(?=,|\)|)/gm);
            regex.lastIndex = this.text.Head;
            const result = regex.exec(this.text.Text);
            if (result && result[0] && result.index === this.text.Head)
                return {
                    count: result[0].length,
                    tokenType: "STRING"
                }
            return undefined;
        }
    }


    isNumber(): TokenReadingRule {
        let count = 0;
        // check for a number
        if (this.text.isDigit()) {
            count = this.appendAllDigits(count);
            // get number, can have a single dot
            if (this.text.nextIs('.', count)) {
                count++;
                count = this.appendAllDigits(count);
            }

            // check for exponential notation like "2.3e-4", "1.23e50" or "2e+4"
            if (this.text.nextIs('E', count) || this.text.nextIs('e', count)) {
                if (this.text.isDigit(count + 1) || this.text.nextIs('-', count + 1) || this.text.nextIs('+', count + 1)) {
                    count++;

                    if (this.text.nextIs('+', count) || this.text.nextIs('-', count)) count++;

                    // Scientific notation MUST be followed by an exponent
                    if (!this.text.isDigit(count)) {
                        // throw this.createSyntaxError('Digit expected, got "' + this.currentCharacter() + '"')
                        throw new Error('Digit expected, got "' + this.text.next(count) + '"')
                    }

                    count = this.appendAllDigits(count);

                    if (this.text.isDecimalMark(count)) {
                        // throw this.createSyntaxError('Digit expected, got "' + this.currentCharacter() + '"')
                        throw new Error('Digit expected, got "' + this.text.next(count) + '"')
                    }
                } else if (this.text.nextIs('.', count)) {
                    this.text.incrementIndex()
                    // throw this.createSyntaxError('Digit expected, got "' + this.currentCharacter() + '"')
                    throw new Error('Digit expected, got "' + this.text.next(count) + '"')
                }
            }

            // this is no number, it is just a dot (can be dot notation)
            return {
                count,
                tokenType: "NUMBER"
            };
        }
        return undefined;
    }

    isEnum(): TokenReadingRule {

        let count = 0;

        if (this.text.nextIs('.', count) && this.text.isAlpha(count + 1)) {
            count++;
            while (!this.text.nextIs('.', count)) {
                count++
            };
            count++;

            // const regex = new RegExp(/\.[^\W|\d]+\./gm);
            // regex.lastIndex = this.text.Head;
            // const result = regex.exec(this.text.Text);
            // if (result && result[0] && result.index === this.text.Head)
            return {
                count: count,
                tokenType: "ENUM"
            }
        }
        return undefined;
    }

    isClass(): TokenReadingRule {
        // check for variables, functions, named operators
        if (this.text.isAlpha()) {
            const count = this.appendAllAlph(0)
            // const regex = new RegExp(/[^\W\d]*(?=\()/gm);
            // regex.lastIndex = this.text.Head;
            // const result = regex.exec(this.text.Text);
            // if (result && result[0] && result.index === this.text.Head)
            return {
                count: count,
                tokenType: "CLASS"
            }
        }
        return undefined;
    }
    isUnset(): TokenReadingRule {
        // check for variables, functions, named operators
        if (this.text.currentIs('$')) {
            return {
                count: 1,
                tokenType: "UNSET"
            }
        }
        return undefined;
    }
    isRedeclare(): TokenReadingRule {
        // check for variables, functions, named operators
        if (this.text.currentIs('*')) {
            return {
                count: 1,
                tokenType: "REDECLARED"
            }
        }
        return undefined;
    }
    appendAllAlph(start: number): number {
        let count = start;
        while (this.text.isAlpha(count)) count++;
        return count;
    }
    appendAllDigits(start: number): number {
        let count = start;
        while (this.text.isDigit(count)) count++;
        return count;
    }

    appendAllHexDigits(start: number): number {
        let count = start;
        while (this.text.isHexDigit(count)) count++;
        return count;
    }

}