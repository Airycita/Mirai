import { InvalidBooleanParam, InvalidChannelParam, InvalidNumberParam, InvalidUserParam, MissingRequiredParam } from '../structures/errors';
import { EventBuilder } from '../structures/builders';
import { Mirai } from '../structures/mirai';
import { BaseModule } from '@types';

type AnyError = InvalidBooleanParam | InvalidChannelParam | InvalidNumberParam | InvalidUserParam | MissingRequiredParam;

export const data: BaseModule<EventBuilder> = {
    data: new EventBuilder()
        .setName('commandError')
        .setDescription('Triggered when a command error is emitted.')
        .setOnce(false),
    code: async (bot: Mirai, container: AnyError) => {
        if (container instanceof InvalidBooleanParam) {
            await container.channel.sendMessage({
                embeds: [{
                    title: "¡Booleano inválido!",
                    description: "El parámetro `" + container.param.name + "` debe ser un booleano válido.",
                    colour: "FFFFFF"
                }]
            })
        } else if (container instanceof InvalidChannelParam) {
            await container.channel.sendMessage({
                embeds: [{
                    title: "¡Canal inválido!",
                    description: "El parámetro `" + container.param.name + "` debe ser un canal válido.",
                    colour: "FFFFFF"
                }]
            })
        } else if (container instanceof InvalidNumberParam) {
            await container.channel.sendMessage({
                embeds: [{
                    title: "¡Número inválido!",
                    description: "El parámetro `" + container.param.name + "` debe ser un número válido.",
                    colour: "FFFFFF"
                }]
            })
        } else if (container instanceof InvalidUserParam) {
            await container.channel.sendMessage({
                embeds: [{
                    title: "¡Usuario inválido!",
                    description: "El parámetro `" + container.param.name + "` debe ser un usuario válido.",
                    colour: "FFFFFF"
                }]
            })
        } else if (container instanceof MissingRequiredParam) {
            await container.channel.sendMessage({
                embeds: [{
                    title: "¡Parámetro requerido!",
                    description: "El parámetro `" + container.param.name + "` es obligatorio.",
                    colour: "FFFFFF"
                }]
            })
        }
    }
}