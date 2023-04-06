import { CommandData, EventData } from '../typings/index';

export const event: EventData = {
    name: 'message',
    async code(client, message): Promise<void> {
        if (message.author.bot) return;
        // @ts-ignore
        const args: string[] = message.content.slice(client.__options__.prefix.length).split(/ +/g);
        const probably: string | undefined = args.shift()?.toLowerCase();
        if (!probably) return;
        const command: CommandData | undefined = client.oritatami.commands.get(probably);
        if (!command) return;
        try { command.code({ args, client, message }); }
        catch (e: any) { console.log(e); }
    }
}