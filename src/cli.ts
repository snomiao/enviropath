/**
 * 
 * author: YiDong Zhuo(snomiao@gmail.com)
 */
import yargs from 'yargs'
import { enviropathAdd, enviropathDelete, enviropathFix } from './enviropath';

// if (require.main === module) main()
// hideBin
const argv = yargs
    .command('add <path>', 'add this path to %path%', () => { }, (argv: { path: string; }) => {
        enviropathAdd(argv.path)
    })
    .command('del <path>', 'del this path from %path%', () => { }, (argv: { path: string; }) => {
        enviropathDelete(argv.path);
    })
    .command('fix', 'fix %path%', () => { }, (argv: { path: string; }) => {
        enviropathFix();
    })
    .help('h').alias('h', 'help')
    .version()
    // .strictCommands()
    // .demandCommand(1)
    .argv;
console.log(argv);
