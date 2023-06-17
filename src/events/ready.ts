import { EventBuilder } from "../classes/builders";
import { Mirai } from "../classes/mirai";
import { Event } from "typings";

export const data: Event = {
    data: new EventBuilder()
        .setName("ready")
        .setOnce(true),
    code: async (client: Mirai) => {
        client.user?.update({ status: { text: "¡Hola mami-chan! uwu", presence: "Idle" }});
        console.log("Successfully logged in as: " + client.user?.username);
    }
};