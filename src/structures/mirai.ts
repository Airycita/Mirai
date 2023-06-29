import { CommandManager, EventManager } from './managers';
import { BaseModule, MiraiOptions } from '@types';
import { EventBuilder } from './builders';
import { Client } from 'revolt.js';
import { KeyValue as Database } from 'aoi.db';
import { EmbedParser } from '../utils/embed_parser';

export class Mirai {
    commands: CommandManager = new CommandManager();
    database: Database | null = null;
    parsers: { embed: EmbedParser } = { embed: new EmbedParser };
    events: EventManager = new EventManager();
    itself: Client = new Client();
    _options: MiraiOptions | null = null;

    /**
     * Assigns needed properties to the client.
     * @param options Client options.
     */
    assign(options: MiraiOptions) {
        this._options = options
        this.database = new Database(this._options.database ?? {});
    }

    /**
     * Login into the mirai client.
     */
    login() {
        this.database?.on("ready", () => console.log("Database connected!"));
        this.itself.loginBot(`${this._options?.token}`);
    }

    get prefix() {
        return this._options?.prefix;
    }
}