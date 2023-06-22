import { Mirai } from "./mirai";
import { Channel, User } from "revolt.js";

export class Util {
    /**
     * Get a user by ID.
     * @param client Client instance.
     * @param id User ID.
     * @returns {Promise<User | null>}
     */
    static async getUser(client: Mirai, id: string): Promise<User | null> {
        if (!/^<@([A-Z0-9]+)>$/.test(id) || !/[A-Z0-9]/g.test(id)) return null;
        const matcher = /[<@>]/g;
        let user = client.users.get(id.replace(matcher, ""));
        if (!user) user = await client.users.fetch(id.replace(matcher, ""));
        return user || null;
    }

    /**
     * Get a channel by ID.
     * @param client Client instance.
     * @param id Channel ID
     * @returns {Promise<Channel | null>}
     */
    static async getChannel(client: Mirai, id: string): Promise<Channel | null> {
        if (!/^<@([A-Z0-9]+)>$/.test(id) || !/[A-Z0-9]/g.test(id)) return null;
        const matcher = /[<@>]/g;
        let channel = client.channels.get(id.replace(matcher, ""));
        if (!channel) channel = await client.channels.fetch(id.replace(matcher, ""));
        return channel || null;
    }
}