import { PrefixBuilder } from '../classes/builder';
import { Data } from '../typings/index';

export const body = {
    data: new PrefixBuilder()
        .setName('avatar')
        .setDescription('Devuelve el avatar del usuario'),
    async code(d: Data) {
        let user = d.args.join(' ') ? (d.client.users.get(d.args.join(' ')) || await d.client.users.fetch(d.args.join(' '))) : d.message.author;
        if (!user) await d.message.channel!.sendMessage('No se encontró al usuario.');
        await d.message.channel!.sendMessage({ content: `[Avatar](${user!.generateAvatarURL()})` });
    }
}