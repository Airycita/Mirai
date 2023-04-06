import { Message } from 'revolt.js';
import { Bot } from '../classes/client';

export interface Data {
    args: string[];
    client: Bot;
    message: Message;
}