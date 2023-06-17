import { CommandBuilder } from "../classes/builders";
import { Command, Data } from "typings";

export const data: Command = {
    data: new CommandBuilder()
        .setName("ping")
        .setDescription("¡Regresa mi latencia!"),
    async code({ client, message }: Data) {
        await message.channel?.sendMessage({
            embeds: [{
                title: "¡Hola, soy " + client.user?.username + "!",
                icon_url: client.user?.avatarURL,
                description: "Mi latencia es: " + client.websocket.ping + " ms",
                colour: client.color
            }]
        });
    }
};

// Me gustan los builders, pero no dentro de los códigos de los comandos. :)