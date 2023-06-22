import { Mirai } from "src/classes/mirai";
import { KeyValueDatabaseOption } from "aoi.db";
import { Message } from "revolt.js";
import { CommandBuilder, EventBuilder } from "src/classes/builders";
import { Group } from "src/classes/group";
import { MissingRequiredParameter } from "src/classes/errors";
import { Util } from "src/classes/util";

export interface MiraiOptions {
    database?: KeyValueDatabaseOption,
    owners?: string[],
    prefix: string | CallableFunction
}

export interface Event {
    data: EventBuilder,
    code(...args): void
}

export interface Command {
    data: CommandBuilder,
    code?(...args): void
}

export interface Data {
    args: string[],
    client: Mirai,
    message: Message,
    params: Group<string, string | User | Server | Member>,
    util: Util
}

export interface MakedParameter {
    name: string,
    description: string,
    required: boolean,
    index: number,
    type: "string" | "boolean" | "number" | "user" | "member" | "channel"
}

export type AnyError = MissingRequiredParameter;