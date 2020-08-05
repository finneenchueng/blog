import { ref, provide, inject } from 'vue';
import { II18nConfig, II18nOutput } from '@/types/i18n';
import { IStrOpt, IMessage } from '@/types/common';

const identifiers = ['{{', '}}'];

const replace = (translation: string, option?: IMessage) => {
    const _identifiers = identifiers;
    if (_identifiers == null || _identifiers.length !== 2) {
        console.warn('You must specify the start and end character identifying variable substitutions');
    }
    // construct a regular expression ot find variable substitutions, i.e. {{test}}
    const matcher = new RegExp(` ${_identifiers[0]}\\w+${_identifiers[1]}`, 'g');
    return translation.replace(matcher, (placeholder: string): any => {
        // remove the identifiers (can be set on the module level)
        const key = placeholder.replace(_identifiers[0], '').replace(_identifiers[1], '');
        if(!option){
            return key;
        }
        if(option[key]){
            return option[key];
        }
        console.group ? console.group('Not all placeholders found') : console.warn('Not all placeholders found');
        console.warn('Text:', translation);
        console.warn('Placeholder:', placeholder);
        if (console.groupEnd) {
            console.groupEnd();
        }
        return placeholder;
    });

}

// check if the given object is an array
function isArray(obj: any) {
    return !!obj && Array === obj.constructor;
}

const createI18n = (config: II18nConfig) => ({
    locale: ref(config.locale),
    messages: config.messages,
    $t(key: string, option?: IMessage) {
        const translation: string = this.messages[this.locale.value][key];
        return replace(translation, option);
    },
    $tArray(key: string, option?: IMessage) {
        const translation: string = this.messages[this.locale.value][key];
        if(!option){
            return  [ translation ];
        }
        const placeHolder = ':::';
        for(const key in option){
            option[key] = `${placeHolder}${option[key]}${placeHolder}`;
        }
        const result = replace(translation, option);
        return result.split(placeHolder);
    }
});

const i18nSymbol = Symbol();
let _I18n: II18nOutput;

export function provideI18n(i18nConfig: II18nConfig) {
    const i18n = createI18n(i18nConfig);
    provide(i18nSymbol, i18n);
    _I18n = i18n;
}

function useI18n() {
    const i18n = inject(i18nSymbol);
    if (!i18n) throw new Error('No i18n provided!');

    return i18n;
}

export function getI18n() {
    return _I18n;
}