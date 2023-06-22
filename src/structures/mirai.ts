import { Client } from 'revolt.js';
import { BaseModule, MiraiOptions } from '@types';
import { CommandManager, EventManager } from './managers';
import { EventBuilder } from './builders';

export class Mirai {
    commands: CommandManager = new CommandManager();
    events: EventManager = new EventManager();
    itself: Client = new Client();
    _options: MiraiOptions | null = null;

    /**
     * Assigns needed properties to the client.
     * @param options Client options.
     */
    assign(options: MiraiOptions) {
        this._options = options
    }

    /**
     * Login into the mirai client.
     */
    login() {
        this.itself.loginBot(`${this._options?.token}`);
    }

    get prefix() {
        return this._options?.prefix;
    }
}