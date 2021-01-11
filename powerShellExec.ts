import { sortedUniq, sortedUniqBy, uniq } from 'lodash';
import Shell from 'node-powershell';
import fs from 'fs';
/**
 * test powershell
 * author: YiDong Zhuo(snomiao@gmail.com)
 */
if (require.main === module) (async () => {

    return await systemEnviromentPathFix();
})().then(console.log).catch(console.error)


export async function systemEnviromentPathAdd(path: string) {
    let pathList = await systemEnviromentPathListGet();
    pathList.push(path)
    pathList = await asyncFilter(sortedUniq(pathList), fileExists);
    return await systemEnviromentPathListSet(pathList);
}

export async function systemEnviromentPathDelete(path: string) {
    let pathList = await systemEnviromentPathListGet();
    pathList = pathList.filter(p => p !== path)
    pathList = await asyncFilter(sortedUniq(pathList), fileExists);
    return await systemEnviromentPathListSet(pathList);
}

export async function systemEnviromentPathFix() {
    let pathList = await systemEnviromentPathListGet();
    pathList = await asyncFilter(sortedUniq(pathList), fileExists);
    return await systemEnviromentPathListSet(pathList);
}

async function asyncFilter(arr: string[], predicate: { (path: string): Promise<boolean>; (path: string): Promise<boolean>; (path: string): Promise<boolean>; }) {
    const results = await Promise.all(arr.map(predicate));
    return arr.filter((_v: any, index: string | number) => results[index]);
}

async function fileExists(path: string): Promise<boolean> {
    return await fs.promises.access(path).then(() => true).catch(() => false);
}

async function systemEnviromentPathListSet(pathList: string[]) {
    return await systemEnviromentPathSet(pathList.join(';'))
}

async function systemEnviromentPathListGet() {
    return (await systemEnviromentPathGet()).split(/;/);
}

export async function systemEnviromentPathSet(path: string) {
    const systemEnviromentPathSetCommand = systemEnviromentPathSetCommandGet(path)
    await powerShellExec(systemEnviromentPathSetCommand);
    console.log(`# TIPS: IF YOU ARE NOT ADMIN, PLEASE USE | CLIP TO COPY THIS COMMAND AND RUN MANUALY`)
    console.log(systemEnviromentPathSetCommand)
    return systemEnviromentPathSetCommand
}

export function systemEnviromentPathSetCommandGet(newPath: string) {
    return `$path = '${newPath}'; [Environment]::SetEnvironmentVariable('path', $path,'Machine')`;
}

export async function systemEnviromentPathGet() {
    const path = (await powerShellExec("$path = [Environment]::GetEnvironmentVariable('path', 'machine'); echo $path")).trim();
    console.log(JSON.stringify(path))
    return path
}

export async function powerShellExec(psCommands: string) {
    const ps = new Shell({ executionPolicy: 'Bypass', noProfile: true });
    ps.addCommand(psCommands);

    const re = await ps.invoke()
        .then(output => {
            return output;
        })
        .catch(err => {
            console.error('ERROR', err);
            return '';
        });
    ps.dispose();
    return re;
}
