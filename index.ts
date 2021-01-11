import yargs from 'yargs'
import * as _ from 'lodash';
import { systemEnviromentPathAdd, systemEnviromentPathDelete, systemEnviromentPathFix, } from './powerShellExec';

/**
 * 
 * author: YiDong Zhuo(snomiao@gmail.com)
 */
// if (require.main === module) main().then(console.log).catch(console.error)
if (require.main === module) main().then(console.log).catch(console.error)

export async function main() {
    yargs
        .command('add <path>', 'add this path to %path%', () => { }, (argv: { path: string; }) => {
            systemEnviromentPathAdd(argv.path)
        })
        .command('del <path>', 'del this path from %path%', () => { }, (argv: { path: string; }) => {
            systemEnviromentPathDelete(argv.path);
        })
        .command('fix', 'fix %path%', () => { }, (argv: { path: string; }) => {
            systemEnviromentPathFix();
        })
        .help('h').alias('h', 'help')
        .strictCommands()
        .demandCommand(1)
        .argv;
}
