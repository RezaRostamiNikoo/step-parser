import { DELIMITERS } from "./constants";
import { isAlpha, isDecimalMark, isDigit, isDigitDot, isHexDigit, isWhitespace } from "@utils/is";
import { SubstringLimitBreak } from "../errors";

export class StringChar {

    private _text: string = '';
    private _head: number = 0;   // based on theory of computation head is the poiner to the current character
    private _scout: number = 0;   // based on theory of computation head is the poiner to the current character

    get Head(): number { return this._head; }
    get Text(): string { return this._text; }

    constructor(text: string) {
        this._text = text;
    }

    /**
     * Get the next character from the expression.
     * The character is stored into the char c. If the end of the expression is
     * reached, the function puts an empty string in c.
     * @private
     */
    incrementIndex(step: number = 1) {
        this._head = this._scout = this._head + step;
    }

    scoutAhead(step: number = 1) { this._scout = this._scout + step; }
    scoutBack(step: number = 1) { this._scout = this._scout - step; }
    /**
     * View upto `length` characters of the expression starting at the current character.
     *
     * @param {number} [length=1] Number of characters to view
     * @returns {string}
     */
    getString(length: number = 1, head: number = this._head): string {
        if (length === 1 && head > this._text.length - 1) return '';
        if (head < 0 || head + length > this._text.length)
            throw new SubstringLimitBreak(this._text, head, head + length);
        return this._text.substring(head, head + length)
    }

    /**
     * View the current character. Returns '' if end of expression is reached.
     * @returns {string}
     */
    current(): string { return this.getString(1); }
    scout(): string { return this.getString(1); }

    /**
     * Preview the previous character from the expression.
     * @param {number} step number of steps backward
     * @return {string} return the previous characters
     */
    prev(step: number = 1): string {
        return this._text.charAt(this._head - step)
    }

    /**
     * Preview the next character from the expression.
     * @param {number} step number of steps forward
     * @return {string} return string/one character
     */
    next(step: number = 1): string {
        return this._text.charAt(this._head + step)
    }

    /**
     * it checks if the current character is the given character or not
     * @param {string} char the character to be checked
     * @returns {boolean} boolean
     */
    currentIs(char: string): boolean {
        return this.current() === char;
    }
    scoutIs(char: string): boolean {
        return this.current() === char;
    }

    nextIs(char: string, step: number = 1): boolean {
        return this.next(step) === char;
    }

    prevIs(char: string, step: number = 1): boolean {
        return this.prev(step) === char;
    }

    isDigitDot(): boolean {
        return isDigitDot(this.current());
    }

    isDigit(offset: number = 0): boolean {
        return isDigit(this.next(offset));
    }

    isWhitespace() {
        return isWhitespace(this.current());
    }

    isDecimalMark(step: number = 0): boolean {
        return isDecimalMark(this.next(step), this.next(step + 1));
    }

    isHexDigit(step: number = 0): boolean {
        return isHexDigit(this.next(step));
    }

    isAlpha(step: number = 0) {
        return isAlpha(this.next(step), this.next(step - 1), this.next(step + 1));
    }

    /**
     * it skips the characters entered as arguments and change the location of the head
     * @param {Array<string>} chars a list of characters to be ignored
     */
    skipIgnoredCharacters(chars: Array<string> = [' ', '\t', '\n', '\r']) {
        // skip over ignored characters:
        while (true) {
            if (chars.includes(this.current()))
                this.incrementIndex();
            else break;
        }
    }
    /**
     * it checks if there is any more character to checks. otherwise this means that it is at the end
     * @returns {boolean} true if it is the end 
     */
    isEnd(): boolean { return this.currentIs(''); }

    /**
     * it checks if the string based on the number of charaters is kind of delimiters
     * @param {boolean} chars number of character to be extracted from text and checked against delimiers
     * @returns {boolean} returns boolean
     */
    isDelimiter(chars: number = 1) {
        const str = this.getString(chars);
        if (str.length === chars)
            return DELIMITERS[str];
        return false;
    }

    /**
     * itnot only extracs the characters in the text from the location of head forward 
     * it also changes the head location based on the number of character it extracts
     * @param {string} chars returns extracted charcter
     */
    extractChar(chars: number = 1): string {
        const result = this.getString(chars);
        this.incrementIndex(chars);
        return result;
    }
}