import { MakedParameter } from "@types";
import { Channel, Message } from "revolt.js";

export class InvalidBooleanParam {
    public channel: Channel
    public param: MakedParameter
    constructor(channel: Channel, param: MakedParameter) {
        this.channel = channel;
        this.param = param;
    }
}

export class InvalidChannelParam {
    public channel: Channel
    public param: MakedParameter
    constructor(channel: Channel, param: MakedParameter) {
        this.channel = channel;
        this.param = param;
    }
}

export class InvalidNumberParam {
    public channel: Channel
    public param: MakedParameter
    constructor(channel: Channel, param: MakedParameter) {
        this.channel = channel;
        this.param = param;
    }
}

export class InvalidUserParam {
    public channel: Channel
    public param: MakedParameter
    constructor(channel: Channel, param: MakedParameter) {
        this.channel = channel;
        this.param = param;
    }
}

export class MissingRequiredParam {
    public channel: Channel
    public param: MakedParameter
    constructor(channel: Channel, param: MakedParameter) {
        this.channel = channel;
        this.param = param;
    }
}