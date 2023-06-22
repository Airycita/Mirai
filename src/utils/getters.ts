import { Mirai } from '../structures/mirai';

export class Getters {
    /**
     * Get  a channel by ID.
     * @param client Client instance.
     * @param id Channel ID
     * @returns {Promise<Channel | null>}
     */
    static async getChannel(client: Mirai, id: string) {
        let channel = client.itself.channels.get(id)
        if (!channel) channel = await client.itself.channels.fetch(id)
        return channel ?? null
    }

    /**
     * Get a user by ID.
     * @param client Client instance.
     * @param id User ID.
     * @returns {Promise<User | null>}
     */
    static async getUser(client: Mirai, id: string | number) {
        let user = client.itself.users.get(id.toString())
        if (!user) user = await client.itself.users.fetch(id.toString())
        return user ?? null
    }
}