import translate from 'translate-google';
import { Command } from '../classes/builder';
import { Data } from '../typings/index';

export const body = {
    data: new Command()
        .setName('translate')
        .setDescription('Traduce un texto.'),
    async code(d: Data) {
        const [target, ...text] = d.args;
        if (!target) return await d.message.channel!.sendMessage({ content: 'Debes dar un idioma para traducir.' });
        if (text.length === 0) return await d.message.channel!.sendMessage({ content: 'Debes escribir un texto para traducir.' });
        const message = await d.message.channel!.sendMessage({ content: 'Traduciendo...' });
        const translated = await translate(text.join(' '), { to: target });
        await message.edit({ content: `${translated}` });
    }
}