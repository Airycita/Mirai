import { Client, ClientOptions } from 'revolt.js';
import { BotOptions } from '../typings';
import { Oritatami } from './oritatami';

export class Bot extends Client {
    public oritatami: Oritatami
    private __options__: BotOptions;
    constructor (options: ClientOptions | undefined, extraOptions: BotOptions) {
        super(options);
        this.oritatami = new Oritatami(this);
        this.__options__ = extraOptions;
    }
    async load_commands (dir: string): Promise<void> {
        this.oritatami.load_commands(dir);
    }
    async load_events (dir: string): Promise<void> {
        this.oritatami.load_events(dir);
    }
}