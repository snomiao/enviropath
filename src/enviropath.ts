import { sortedUniq } from 'lodash';
import Shell from 'node-powershell';
import fs from 'fs';


export async function enviropathAdd(path: string) {
    let pathList = await enviropathListGet();
    pathList.push(path);
    pathList = await asyncFilter(sortedUniq(pathList), fileExists);
    return await enviropathListSet(pathList);
}

export async function enviropathDelete(path: string) {
    let pathList = await enviropathListGet();
    pathList = pathList.filter(p => p !== path);
    pathList = await asyncFilter(sortedUniq(pathList), fileExists);
    return await enviropathListSet(pathList);
}

export async function enviropathFix() {
    let pathList = await enviropathListGet();
    pathList = await asyncFilter(sortedUniq(pathList), fileExists);
    return await enviropathListSet(pathList);
}

async function asyncFilter(arr: string[], predicate: { (path: string): Promise<boolean>; (path: string): Promise<boolean>; (path: string): Promise<boolean>; }) {
    const results = await Promise.all(arr.map(predicate));
    return arr.filter((_v: any, index: string | number) => results[index]);
}

async function fileExists(path: string): Promise<boolean> {
    return await fs.promises.access(path).then(() => true).catch(() => false);
}

async function enviropathListSet(pathList: string[]) {
    return await enviropathSet(pathList.join(';'));
}

async function enviropathListGet() {
    return (await enviropathGet()).split(/;/);
}

export async function enviropathSet(path: string) {
    const enviropathSetCommand = enviropathSetCommandGet(path);
    await powerShellExec(enviropathSetCommand);
    console.log(`# TIPS: IF YOU ARE NOT ADMIN, PLEASE USE | CLIP TO COPY THIS COMMAND AND RUN MANUALY`);
    console.log(enviropathSetCommand);
    return enviropathSetCommand;
}

export function enviropathSetCommandGet(newPath: string) {
    return `$path = '${newPath}'; [Environment]::SetEnvironmentVariable('path', $path,'Machine')`;
}

export async function enviropathGet() {
    const path = (await powerShellExec("$path = [Environment]::GetEnvironmentVariable('path', 'machine'); echo $path")).trim();
    console.log(JSON.stringify(path));
    return path;
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
