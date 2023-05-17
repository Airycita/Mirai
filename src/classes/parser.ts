import { SendableEmbed, DataMessageSend } from 'revolt-api';
import { MessageEmbed } from './builder';

export class EmbedParser {
    public content: string;
    public embeds: SendableEmbed[];
    constructor () {
        this.content = '';
        this.embeds = [];
    }

    /**
     * Parses Embed Parser code.
     * @param code 
     * @returns 
     */
    public parse(code: string): DataMessageSend {
        this.clear();
        if (!code.includes('$newEmbed[')) return { content: code, embeds: this.embeds };
        const embedData = code.split('$newEmbed[').slice(1);
        for (const data of embedData) {
            const embed = new MessageEmbed()
            if (this.check(data, 'setTitle')) {
                embed.setTitle(this.unpack(data, 'setTitle'));
            };
            if (this.check(data, 'setDescription')) {
                embed.setDescription(this.unpack(data, 'setDescription'));
            };
            if (this.check(data, 'setColor')) {
                embed.setColor(this.unpack(data, 'setColor'));
            };
            this.embeds.push(embed.toJSON());
        }
        return { content: this.content, embeds: this.embeds };
    }

    /**
     * Checks if the code contains a function.
     * @param src Source code.
     * @param sample Function match.
     * @returns {boolean}
     */
    private check(src: string, sample: EmbedFunction): boolean {
        return src.includes(sample);
    }

    /**
     * Unpacks the function inside.
     * @param src Source code.
     * @param sample Function match.
     * @returns {string}
     */
    private unpack(src: string, sample: EmbedFunction): string {
        return src.split(`$${sample}[`).slice(1).join('').split(']').slice(0, 1).join('').trim();
    }

    /**
     * Returns the inside splits.
     * @param src Function inside.
     * @returns {string[]}
     */
    private splits(src: string): string[] {
        return src.split(';').map(split => split.trim());
    }

    /**
     * Re-starts the embeds array.
     */
    private clear(): void {
        this.content = '';
        this.embeds = [];
    }
}

declare type EmbedFunction = 'setTitle' | 'setThumbnail' | 'setDescription' | 'setImage' | 'setFooter' | 'setColor' | 'addField';