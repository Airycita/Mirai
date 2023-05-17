import { Command } from '../classes/builder';
import { Data } from '../typings/index';

export const body = {
    data: new Command()
        .setName('repeat')
        .setDescription('Repite el mensaje.'),
    async code(d: Data) {
        if (d.args.length === 0) return await d.message.channel!.sendMessage({ content: 'Escribe un mensaje!' });
        const hi = d.client.parser.parse(d.args.join(' '));
        // @ts-ignore
        await d.message.channel!.sendMessage(hi);
    }
}