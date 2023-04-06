import { EventData } from '../typings/index';

export const event: EventData = {
    name: 'ready',
    async code(client): Promise<void> {
        console.log(`Successfully logged in as ${client.user!.username}`);
        client.users.edit({ status: { text: 'hola', presence: 'Online' } });
    }
}