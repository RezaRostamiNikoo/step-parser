export * from "./EmptyExpressionError";
export * from "./ExpressionRuntimeError";
export * from "./ExpressionSyntaxError";

export class SubstringLimitBreak extends Error {
    constructor(text: string, start: number, end: number) {
        super(`The text\n\n${text}\n\ncannot be substring from ${start} to ${end}`);
    }
}

export class NumberExpected extends Error {
    constructor(text: string, head: number) {
        const spaces = new Array(head).fill(" ").join("");
        const errorText = `${text}\n${spaces}^`
        super(`${errorText}\nA numberical character is expected.`);
    }
}

export class anyCharacterExpected extends Error {
    constructor(text: string, head: number) {
        const spaces = new Array(head).fill(" ").join("");
        const errorText = `${text}\n${spaces}^`
        super(`${errorText}\nAny character is expected.`);
    }
}
export class UnexpectedEnd extends Error {
    constructor() {
        super(`Unexpected end of expression`);
    }
}
export class CharacterExpected extends Error {
    constructor(text: string, head: number, char: string) {
        const spaces = new Array(head).fill(" ").join("");
        const errorText = `${text}\n${spaces}^`
        super(`${errorText}\n\"${char}\" is expected.`);
    }
}

export class UnknownToken extends Error {
    constructor(text: string, head: number) {
        const spaces = new Array(head).fill(" ").join("");
        const errorText = `${text}\n${spaces}^`;
        super(`${errorText}\nThe character is unknown.`);
    }
}