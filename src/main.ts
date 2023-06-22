import { config } from 'dotenv';
import { Mirai } from './structures/mirai';

const mirai = new Mirai();

mirai.assign({
    database: {
        path: './mirai/internal',
        tables: ['channels', 'members', 'servers', 'users']
    },
    prefix: '!',
    token: `${config()?.parsed?.['TOKEN']}`
});

mirai.commands.load('./src/commands');
mirai.events.load(mirai, './src/events');

mirai.itself.on("ready", () => console.log(mirai.itself.user?.username));

mirai.login();