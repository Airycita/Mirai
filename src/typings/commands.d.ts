import { Data } from './index';
import { Bot } from '../classes/client';

declare class PrefixBuilder {
    setName(name: string): any;
    setDescription(description: string): any;
}

export interface CommandData {
    data: PrefixBuilder;
    code: (d: Data) => Promise<void>
}

export interface EventData {
    name: string;
    code: (client: Bot, ...args: any) => Promise<void>
}