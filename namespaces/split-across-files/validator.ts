namespace SplitValidation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
}