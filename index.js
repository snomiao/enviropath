"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require('yargs/yargs');
const helpers_1 = require("yargs/helpers");
const envpath_1 = require("./envpath");
console.log(process.argv);
yargs(helpers_1.hideBin(process.argv))
    .command('add <path>', 'add this path to %path%', () => { }, (argv) => {
    envpath_1.add(argv.path);
})
    .command('del <path>', 'del this path from %path%', () => { }, (argv) => {
    envpath_1.del(argv.path);
})
    .command('resolve <path>', 'resolve this path', () => { }, (argv) => {
    envpath_1.resolve(argv.path);
})
    .strictCommands()
    .demandCommand(1)
    .argv;
