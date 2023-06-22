import { SendableEmbed } from "revolt-api";
import { Command, MakedParameter } from "typings";

export class EventBuilder {
    name = "message";
    once = false;
    owner = false;

    /**
     * Set the event name.
     * @param event Event enum
     */
    setName(event: string) {
        this.name = event;
        return this;
    }

    /**
     * Set whether the event should be executed once or not.
     * @param {boolean} bool Once event or not.
     */
    setOnce(bool: boolean) {
        this.once = bool;
        return this;
    }

    /**
     * Set the command just for owners.
     */
    setOwnerOnly() {
        this.owner = true;
        return this;
    }
}

export class CommandBuilder {
    category = "main";
    name = "";
    description = "";
    params: MakedParameter[] = [];
    subcommands: Command[] = [];
    type = "command";

    /**
     * Set the event name.
     * @param event Event enum
     */
    setName(name: string) {
        this.name = name;
        return this;
    }

    /**
     * Set command description.
     * @param description Command description.
     */
    setDescription(description: string) {
        this.description = description;
        return this;
    }

    /**
     * Set the command category.
     * @param category Command category.
     */
    setCategory(category: string) {
        this.category = category;
        return this;
    }

    /**
     * Add parameters to the command.
     * @param param Function callback.
     * @returns 
     */
    addParameters(param: CallableFunction) {
        const parameter = param(new Parameter(this));
        return this;
    }
}

class Parameter {
    command: CommandBuilder;
    index = 0;
    constructor(command: CommandBuilder) {
        this.command = command;
        this.index = 0;
    }

    /**
     * Adds a string parameter.
     */
    addStringOption(options: { name: string, description: string, required: boolean }) {
        const { name, description, required } = options;
        this.command.params.push({ name, description, required, type: "string", index: this.index });
        this.index++;
    }

    /**
     * Adds a subcommand to the main command.
     * @param config Command body.
     */
    addSubCommand(config: Command) {
        config.data.type = "subcommand";
        this.command.subcommands.push(config);
    }

    /**
     * Add a user option to the command.
     * @param options Options object.
     */
    addUserOption(options: { name: string, description: string, required: boolean }) {
        const { name, description, required } = options;
        this.command.params.push({ name, description, required, type: "user", index: this.index });
        this.index++;
    }

    addChannelOption(options: { name: string, description: string, required: boolean }) {
        const { name, description, required } = options;
        this.command.params.push({ name, description, required, type: "channel", index: this.index });
        this.index++;
    }

    addNumberOption(options: { name: string, description: string, required: boolean }) {
        const { name, description, required } = options;
        this.command.params.push({ name, description, required, type: "number", index: this.index });
        this.index++;
    }

    addBooleanOption(options: { name: string, description: string, required: boolean }) {
        const { name, description, required } = options;
        this.command.params.push({ name, description, required, type: "boolean", index: this.index });
        this.index++;
    }
}

export class EmbedBuilder {
    /**
     * Class taken from "revolt.io"
     * https://github.com/revolt-io/revolt.io/blob/stable/src/structures/MessageEmbed.ts
     */
    #url?: string;
    #title?: string;
    #description?: string;
    #icon_url?: string;
    #color?: string;
    #media?: string;
  
    setTitle(title: string): this {
        this.#title = title;
        return this;
    }
  
    setIcon(iconURL: string): this {
        this.#icon_url = iconURL;
        return this;
    }
  
    setColor(color: string): this {
        this.#color = color;
        return this;
    }
  
    setDescription(description: string): this {
        this.#description = description;
        return this;
    }
  
    setURL(url: string): this {
        this.#url = url;
        return this;
    }
  
    setMedia(media: string): this {
        this.#media = media;
        return this;
    }
  
    toJSON(): SendableEmbed {
        return {
            title: this.#title,
            description: this.#description,
            url: this.#url,
            icon_url: this.#icon_url,
            colour: this.#color,
            media: this.#media,
        };
    }
}