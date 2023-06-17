import { CommandBuilder, EventBuilder } from "./builders";
import { lstatSync, readdirSync } from "fs";
import { Mirai } from "./mirai";
import { cwd } from "process";
import { join } from "path";

type Logger = Record<string, string>;

export async function LoadCommands(dir: string, client: Mirai) {
    const root = cwd(), msgs: Logger[] = [], files = readdirSync(join(root, dir));
    for (const file of files) {
        const stat = lstatSync(join(root, dir, file));
        if (stat.isDirectory()) { await LoadCommands(join(dir, file), client); continue; }
        const command = (await import(join(root, dir, file))).data;
        if (!command || !(command.data instanceof CommandBuilder)) {
            msgs.push({ name: command.data.name ?? "unknown", status: "Failed to load" });
            continue;
        }
        client.commands.set(command.data.name, command);
        msgs.push({ name: command.data.name ?? "unknown", status: "Loaded" });
    }
    console.table(msgs);
}

export async function LoadEvents(dir: string, client: Mirai) {
    const root = cwd(), msgs: Logger[] = [], files = readdirSync(join(root, dir));
    for (const file of files) {
        const stat = lstatSync(join(root, dir, file));
        if (stat.isDirectory()) { await LoadCommands(join(dir, file), client); continue; }
        const event = (await import(join(root, dir, file))).data;
        if (!event || !(event.data instanceof EventBuilder)) {
            msgs.push({ name: event.data.name ?? "unknown", type: event.data.once ? "Once" : "Always", status: "Failed to load" });
            continue;
        }
        if (event.data.once) client.once(event.data.name, (...args) => event.code(client, ...args));
        else client.on(event.data.name, (...args) => event.code(client, ...args));
        msgs.push({ name: event.data.name ?? "unknown", type: event.data.once ? "Once" : "Always", status: "Loaded" });
    }
    console.table(msgs);
}