import { CommandBuilder } from "../classes/builders";
import { Command, Data } from "typings";

export const data: Command = {
    data: new CommandBuilder()
        .setName("user")
        .setDescription("Comandos de usuarios.")
        .addParameters(param => param
            .addSubCommand({
                data: new CommandBuilder()
                    .setName("avatar")
                    .setDescription("Obtén el avatar del usuario provisto.")
                    .addParameters(param => param.addUserOption({
                        name: "target",
                        description: "El usuario del que quieres obtener el avatar.",
                        required: false
                    })),
                code: async ({ message, params }: Data) => {
                    const target = params.get("target") ?? message.author;
                    await message.channel?.sendMessage({
                        content: `[Avatar de ${target.username}](${target.avatarURL})`
                    });
                }
            })
        )
};