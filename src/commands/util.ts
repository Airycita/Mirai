import { CommandBuilder } from "../classes/builders";
import { Command, Data } from "typings";

export const data: Command = {
    data: new CommandBuilder()
        .setName("util")
        .setDescription("Comandos de utilidad.")
        .addParameter(param => param
            .addSubCommand({
                data: new CommandBuilder()
                    .setName("say")
                    .setDescription("¡Repite tu mensaje!")
                    .addParameter(param => param.addStringOption({
                        name: "message",
                        description: "El texto que quieres que repita.",
                        required: true
                    })),
                code: async ({ args, message}: Data) => {
                    await message.channel?.sendMessage(args?.join(" "));
                }
            })
        )
};