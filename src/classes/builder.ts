export class PrefixBuilder {
    public name: string;
    public description: string;
    constructor () {
        this.name = '';
        this.description = '...';
    }
    /** 
    * @param {string} name Sets the command name.
    */
    setName(name: string) {
        this.name = name;
        return this;
    }
    /** 
    * @param {string} description Sets the command description.
    */
    setDescription(description: string) {
        this.description = description;
        return this;
    }
}