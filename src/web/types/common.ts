export type IParameter = {
    [name: string]: string | number | boolean | unknown | IParameter;
}

export type IStrOpt = {
    [name: string]: string;
}

export type IMessage = {
    [name: string]: string | number | boolean;
}

export type IMessages = {
    [name: string]: string | number | boolean | IMessage;
}