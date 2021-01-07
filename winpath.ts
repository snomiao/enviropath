import { exec } from 'child_process';
import { accessSync } from 'fs';
import path from 'path';
/**
 * winpath apis
 * author: YiDong Zhuo(snomiao@gmail.com) 2021-01-07
 */
if (require.main === module) (async () => {
    // return resolve('C:/')
})().then(console.log).catch(console.error)

export function del(param_path: string) {
    param_path = path.resolve(param_path)
    console.log('Not developed yet, please contact the author by snomiao@gmail.com. ');
    param_path;
}
export function remove_invalid(param_path: string) {
    param_path = path.resolve(param_path)
    console.log('Not developed yet, please contact the author by snomiao@gmail.com. ');
    param_path;
}
export function add(param_path: string) {
    // [command line - Adding a directory to the PATH environment variable in Windows - Stack Overflow]( https://stackoverflow.com/questions/9546324/adding-a-directory-to-the-path-environment-variable-in-windows )
    param_path = path.resolve(param_path)
    // console.assert(accessSync(param_path) , 'file doesnt exists!')
    const cmdSet = `SET PATH=%PATH%;"${param_path}"`;
    const cmdSetX = `start "" cmd /k setx path "%path%;${param_path}"`;
    console.log(cmdSetX);
    exec(cmdSetX);
}
export function resolve(param_path: string) {
    param_path = path.resolve(param_path)
    console.log(param_path);
}
export function check() {
    console.error('TODO contact snomiao@gmail.com')
    console.log('Not developed yet, please contact the author by snomiao@gmail.com. ');
}
