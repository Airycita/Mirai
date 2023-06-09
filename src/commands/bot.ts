import { Server } from 'revolt.js';
import { CommandBuilder } from '../structures/builders';
import { BaseModule, Data } from '@types';

export const data: BaseModule<CommandBuilder> = {
    data: new CommandBuilder()
        .setName("bot")
        .setDescription("...")
        .setCategory("bot")
        .addSubCommand({
            data: new CommandBuilder()
                .setName("info")
                .setDescription("¡Revisa mi información técnica!"),
            code: async ({ message }: Data) => {
                await message.channel?.sendMessage({
                    embeds: [{
                        title: "¡Hola, mi nombre es " + message.client.user?.username + "!",
                        icon_url: message.client.user?.avatarURL,
                        description: "¡La mejor bot de revolt en español!\n**Dependencias**\n" + [
                            "Revolt.js:" + (await import("revolt.js")).LIBRARY_VERSION,
                            "Node.js:" + (await import("process")).version.replace(/v/g, ""),
                            "MiraiCore (Framework):1.0.0",
                            "**Estadísticas**\nUsuarios:" + message.client.users.size + " usuarios cacheados",
                            "Servidores:" + message.client.servers.size + " servidores cacheados"
                        ].map((line: string) => `**${line.split(":")[0]}**: ${line.split(":")[1]}`).join("\n"),
                        colour: "FFFFFF"
                    }]
                });
            }
        })
        .addSubCommand({
            data: new CommandBuilder()
                .setName("ping")
                .setDescription("¡Revisa la latencia de mi websocket!"),
            async code({ message }: Data) {
                await message.channel?.sendMessage({
                    embeds: [{
                        title: "Latencia",
                        description: `Mi latencia es: \`${message.client.websocket.ping} ms\``,
                        colour: "FFFFFF"
                    }]
                })
            }
        })
        .addSubCommand({
            data: new CommandBuilder()
                .setName("test")
                .setDescription("Testea el custom script que desees.")
                .appendParameters(param => param
                    .addStringOption({
                        name: "texto",
                        description: "El mensaje a testear.",
                        required: true 
                    })
                ),
            async code({ bot, message, params }: Data) {
                const text = params.get("texto");
                try {
                    const data = bot.parsers.embed.parse(text);
                    await message.channel?.sendMessage(data);
                } catch {
                    await message.channel?.sendMessage({
                        embeds: [{
                            title: "¡Uh-oh, algo salió mal!",
                            description: "Probablemente algún parámetro está mal o el mensaje está vacío.",
                            colour: "FFFFFF"
                        }]
                    })
                }
                
            }
        })
}