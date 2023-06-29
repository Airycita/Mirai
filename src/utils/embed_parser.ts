import { EmbedBuilder } from "../structures/builders";
import { SendableEmbed, DataMessageSend } from "revolt-api";

// https://gist.github.com/Airycita/376eb29bd0e481bcbdf6e02749b70f8e

export class EmbedParser {
    private regex: RegExp = /{newEmbed:({(setTitle|setDescription|setColor|setURL|setIcon):.*?})+}/g;

    /**
     * Parses the custom script into sendable message data.
     * @param input The script to parse into sendable data.
     * @returns {DataMessageSend}
     */
    parse(input: string): DataMessageSend {
        const found_embeds = input.replace(/\n/g, "").match(this.regex);
        const embeds: SendableEmbed[] = [];
        if (found_embeds) {
            for (const embed of found_embeds) {
                const e = new EmbedBuilder;
                if (this.#check(embed, 'setTitle')) {
                    e.setTitle(this.#unpack(embed, 'setTitle'));
                };
                if (this.#check(embed, 'setIcon')) {
                    e.setIcon(this.#unpack(embed, 'setIcon'));
                };
                if (this.#check(embed, 'setColor')) {
                    e.setColor(this.#unpack(embed, 'setColor'));
                };
                if (this.#check(embed, 'setDescription')) {
                    e.setDescription(this.#unpack(embed, 'setDescription'));
                };
                if (this.#check(embed, 'setURL')) {
                    e.setURL(this.#unpack(embed, 'setURL'));
                };
                embeds.push(e.toJSON());
            }
        }
        return {
            embeds,
            content: input.replace(this.regex, "").trim() ?? ""
        }
    }

    /**
     * Checks if the code contains a function.
     * @param src Source code.
     * @param sample Function match.
     * @returns {boolean}
     */
    #check(src: string, sample: EmbedFunction): boolean {
        return src.includes(sample);
    }

    /**
     * Unpacks the function inside.
     * @param src Source code.
     * @param sample Function match.
     * @returns {string}
     */
    #unpack(src: string, sample: EmbedFunction): string {
        return src.split(`{${sample}:`).slice(1).join('').split('}').slice(0, 1).join('').trim();
    }

    /**
     * Returns the inside splits.
     * @param src Function inside.
     * @returns {string[]}
     */
    #splits(src: string): string[] {
        return src.split(';').map(split => split.trim());
    }
}

type EmbedFunction = 'setTitle' | 'setIcon' | 'setDescription' | 'setColor' | 'setURL';