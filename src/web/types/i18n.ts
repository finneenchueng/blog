import { IStrOpt, IMessage } from "./common";
import { Ref } from "vue";

export interface II18nConfig {
    locale: Ref<string>;
    messages: {
        [key: string]: IStrOpt
    }

}
export type II18nOutput  = II18nConfig & {
    $t: (key: string, option?: IMessage) => string;
    $tArray: (key: string, option?: IMessage) => string[];
}