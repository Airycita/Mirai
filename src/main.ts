import { Bot } from './classes/client';
import dotenv from 'dotenv';

const bot = new Bot(undefined, { prefix: '!' });

bot.load_commands('./src/commands');
bot.load_events('./src/events');

bot.loginBot(dotenv.config().parsed?.TOKEN!);