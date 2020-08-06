import { ref } from 'vue';
import { provideI18n, getI18n } from './i18nPlugin';
import { II18nOutput } from '@/types/i18n';
import { IMessage } from '@/types/common';
import enUS from '@/assets/locales/en-US';
import zhCN from '@/assets/locales/zh-CN';

export function initLanguage(){
    const lan =  window.navigator.language;
    const language = lan.includes('-')? lan.split('-')[0] : 'en';
    provideI18n({
        locale: ref(language),
        messages: {
          en: enUS,
          zh: zhCN
        }
    });
}

export function setLanguage(lan: string){
    const i18n: II18nOutput = getI18n() as II18nOutput;
    if(i18n.locale.value === lan){
        return;
    }
    let language;
    switch (lan) {
        case 'en':
            language = 'en';
            break;
        case 'zh':
            language = 'zh';
            break;
        default:
            language = 'en';
    }
    i18n.locale.value = language;
}

export function $t(key: string, option?: IMessage){
    return key;
    const i18n: II18nOutput = getI18n() as II18nOutput;
    return i18n.$t(key, option);
}