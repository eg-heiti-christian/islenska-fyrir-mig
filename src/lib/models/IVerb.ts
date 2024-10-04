import { IBaseType } from "./IBaseType";
import { IVerbConjugation } from "./IVerbConjugation";

export interface IVerb extends IBaseType {
    infinitive: string;
    presentTense?: IVerbConjugation
}