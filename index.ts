const yargs = require('yargs/yargs')
import { hideBin } from 'yargs/helpers';
import { add, del, resolve } from './winpath';

console.log(process.argv)

yargs(hideBin(process.argv))
    .command('add <path>', 'add this path to %path%', () => { }, (argv: { path: string; }) => {
        add(argv.path);
    })
    .command('del <path>', 'del this path from %path%', () => { }, (argv: { path: string; }) => {
        del(argv.path);
    })
    .command('resolve <path>', 'resolve this path', () => { }, (argv: { path: string; }) => {
        resolve(argv.path)
    })
    .strictCommands()
    .demandCommand(1)
    .argv;
