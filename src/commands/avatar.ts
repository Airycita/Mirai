import { PrefixBuilder } from '../classes/builder';
import { Data } from '../typings/index';

export const body = {
    data: new PrefixBuilder()
        .setName('avatar')
        .setDescription('Devuelve el avatar del usuario'),
    async code(d: Data) {
        console.log(d);
    }
}