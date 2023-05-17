export class Command {
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

export class MessageEmbed {
    #url?: string;
    #title?: string;
    #description?: string;
    #icon_url?: string;
    #color?: string;
    // #media?: string;
  
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
  
    /*
    setMedia(media: string): this {
      this.#media = media;
      return this;
    }
    */
  
    toJSON(): any {
      return {
        title: this.#title,
        description: this.#description,
        url: this.#url,
        icon_url: this.#icon_url,
        colour: this.#color,
        // media: this.#media,
      };
    }
  }