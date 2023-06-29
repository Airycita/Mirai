import { KeyValueDatabaseOption } from 'aoi.db';
import { CommandBuilder, EventBuilder } from './src/structures/builders';
import { Message } from 'revolt.js';
import { Group } from 'src/structures/group';

export interface MiraiOptions {
    database?: KeyValueDatabaseOption,
    prefix: string,
    token: string
}

export interface BaseModule<T> {
    data: T,
    code?: (...args) => void
}

export interface MakedParameter {
    name: string,
    description: string,
    required: boolean,
    index: number,
    type: "boolean" | "channel" | "member" | "number" | "string" | "user"
}

export interface ParameterData {
    name: string,
    description: string,
    required: boolean
}

export interface Data {
    bot: Mirai,
    message: Message,
    args: string[],
    params: Group<string, MakedParameter>
}