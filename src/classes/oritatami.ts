import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { Bot } from './client';
import { CommandData } from '../typings/index';

export class Oritatami {
    public client: Bot;
    public commands: Map<string, CommandData>
    constructor (client: Bot) {
        this.client = client;
        this.commands = new Map<string, CommandData>();
    }
    async load_commands(dir: string): Promise<void> {
        const files = readdirSync(dir);
        for (const file of files) {
            let stat = lstatSync(join(cwd(), dir, file));
            if (stat.isDirectory()) { this.load_commands(join(dir, file)); continue; }
            const command = require(join(cwd(), dir, file)).body;
            if (!command) continue;
            this.commands.set(command.data.name, command);
        }
    }
    async load_events(dir: string): Promise<void> {
        const files = readdirSync(dir);
        for (const file of files) {
            let stat = lstatSync(join(cwd(), dir, file));
            if (stat.isDirectory()) { this.load_events(join(dir, file)); continue; }
            const event = require(join(cwd(), dir, file)).event;
            if (!event) continue;
            // @ts-ignore
            this.client.on(event.name, (...args) => event.code(this.client, ...args));
        }
    }
}