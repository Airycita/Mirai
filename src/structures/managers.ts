import { CommandBuilder, EventBuilder } from './builders';
import { CommandParser } from '../utils/command_parser';
import { lstatSync, readdirSync } from 'fs';
import { BaseModule } from '@types';
import { Mirai } from './mirai';
import { Group } from './group';
import { join } from 'path';

/**
 * Check if the provided file name ends with ".js" or ".ts", ignoring definition type files (d.ts).
 * @param file File name.
 * @returns {boolean}
 */
function isValidFile(file: string) {
    return (file.endsWith(".js") || !file.endsWith("d.ts") && file.endsWith(".ts"));
}

export class CommandManager {
    public cache: Group<string, BaseModule<CommandBuilder>> = new Group;
    public parser: CommandParser = new CommandParser;
    public __dir: string | null = null;

    /**
     * Load commands to the client.
     * @param dir Commands path.
     */
    async load(dir: string) {
        this.__dir = dir;
        const root = process.cwd(),
        files = readdirSync(join(root, dir));
        for (const file of files) {
            let isFile = lstatSync(join(root, dir, file)).isFile()
            if (isFile && isValidFile(file)) {
                const command: BaseModule<CommandBuilder> = (await import(join(root, dir, file))).data;
                if (!command || !(command.data instanceof CommandBuilder)) continue;
                this.cache.set(command.data.name, command);
            } else { await this.load(join(dir, file)); continue; }
        }
    }

    /**
     * Reload all commands.
     */
    async reload() {
        this.cache.clear();
        await this.load(`${this.__dir}`);
    }
}

export class EventManager {
    public cache: Group<string, BaseModule<EventBuilder>> = new Group;

    /**
     * Add event listening to the client.
     * @param dir Commands path.
     */
    async load(client: Mirai, dir: string) {
        const root = process.cwd(),
        files = readdirSync(join(root, dir));
        for (const file of files) {
            let isFile = lstatSync(join(root, dir, file)).isFile()
            if (isFile && isValidFile(file)) {
                const event: BaseModule<EventBuilder> = (await import(join(root, dir, file))).data;
                if (!event || !(event.data instanceof EventBuilder)) continue;
                if (event.data.once) client.itself.once(`${event.data.name}`, (...args) => event.code?.(client, ...args));
                else client.itself.on(event.data.name as any, (...args) => event.code?.(client, ...args));
            } else { await this.load(client, join(dir, file)); continue; }
        }
    }
}
