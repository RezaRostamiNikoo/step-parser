
import { Scope } from "./Scope";
import { Expression } from "./Expression";
import { Token } from "./Token";
import { TokenType } from "./types";
import { Stack, Queue } from 'predefined-ds';

export class State {
    private scope: Scope;
    private _expression: Expression; // current expression
    private _level: number = 0;
    private _tokens: Queue<Token>;
    private _deletedTokens: Stack<Token> = new Stack();

    constructor(expression: string, scope?: Map<string, any>) {
        this._expression = new Expression(expression);
        this.scope = new Scope(scope, (item: any) => item, (item: any) => item);
    }

    get Expression(): Expression { return this._expression; }
    get Tokens(): Array<Token> {
        return this.getTokens().map(t => t);
    }


    /**
     * it calculate all the tokens in an expression.
     * @returns {Queue<Token>} return a queue of tokens generated from the expression
     */
    private getTokens(): Queue<Token> {
        if (this._tokens) return this._tokens;
        this._tokens = new Queue();
        while (true) {
            const token = this._expression.getNextToken();
            if (token) this._tokens.enqueue(token);
            else break;

        }
        // link tokens together
        this._tokens.reduce((prev: Token, curr: Token, c: number, arr: []): any => {
            prev.Next = curr;
            curr.Prev = prev;
            return curr;
        });

        return this._tokens;
    }

    /**
     * It increases the level of the current and all tokens after that. It means that it set a new level for current token
     * be carefule about head and scouting
    */
    nextLevel() {
        ++this._level;
        this.getTokens().forEach(t => t.Level = this._level);
    }

    /**
     * Close parameters.
     * New line characters will no longer be ignored
     * be carefule about head and scouting
     */
    prevLevel() {
        --this._level;
        this.getTokens().forEach(t => t.Level = this._level);
    }


    /**
     * it return the first token available in the queue without shifring it from the list
     * @returns {Token} returns the current token
     */
    get token(): Token { return this.getTokens().peek() || new Token("", "NULL", this._level); }

    /**
     * It shifts the current token from the queue and next toke is ready to be proccessed on
     * @returns {State} return the main state
     */
    goAHead(): State { this._deletedTokens.push(this.getTokens().dequeue()); return this; }
    rewind(): State { this.getTokens().cutTheLine(this._deletedTokens.pop()); return this }

    /**
     * It checks if current token is equal to the given chars or not.
     * @param {string} chars the character to be compared with current token
     * @returns {boolean} return True if it is equal
     */
    isToken(chars: string): boolean { return this.token.Value === chars; }

    /**
     * It checks if current token type is equal to the given type or not.
     * @param {TokenType} type the character to be compared with current token type
     * @returns {boolean} return True if it is equal
     */
    isType(type: TokenType): boolean { return this.token.Type === type; }
}

