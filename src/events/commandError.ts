import { MissingRequiredParameter } from "../classes/errors";
import { EventBuilder } from "../classes/builders";
import { Mirai } from "../classes/mirai";
import { AnyError, Event } from "typings";

const TranslatedParamTypes = {
    string: "Texto",
    boolean: "Bool",
    number: "Número",
    user: "Usuario",
    role: "Rol",
    member: "Miembro"
};

export const data: Event = {
    data: new EventBuilder().setName("commandError"),
    code: async (client: Mirai, error: AnyError) => {
        if (error instanceof MissingRequiredParameter) {
            await error.channel.sendMessage({
                embeds: [{
                    title: "¡Se te olvidó un parámetro!",
                    icon_url: client.user?.avatarURL,
                    description: [
                        "Nombre:" + error.param.name,
                        "Descripción:" + error.param.description,
                        "Tipo de parámetro:" + TranslatedParamTypes[error.param.type],
                        "Nivel de parámetro:" + error.param.required ? "Obligatorio" : "Opcional"
                    ].map((line: string) => `**${line.split(":")[0]}**: ${line.split(":")[1]}`).join("\n"),
                    colour: client.color
                }]
            });
        }
    }
};