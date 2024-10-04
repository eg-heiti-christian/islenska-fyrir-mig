import { IBaseType } from "./IBaseType";
import { IVerb } from "./IVerb";

export interface IVerbConjugation extends IBaseType {
    verbId?: number;
    verb?: IVerb;
    singularFirstPerson: string;
    singularSecondPerson: string;
    singularThirdPerson: string;
    pluralFirstPerson: string;
    pluralSecondPerson: string;
    pluralThirdPerson: string;
}