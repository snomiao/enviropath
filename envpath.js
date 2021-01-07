"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = exports.resolve = exports.add = exports.remove_invalid = exports.del = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
/**
 * winpath apis
 * author: YiDong Zhuo(snomiao@gmail.com) 2021-01-07
 */
if (require.main === module)
    (async () => {
        // return resolve('C:/')
    })().then(console.log).catch(console.error);
function del(param_path) {
    param_path = path_1.default.resolve(param_path);
    console.log('Not developed yet, please contact the author by snomiao@gmail.com. ');
    param_path;
}
exports.del = del;
function remove_invalid(param_path) {
    param_path = path_1.default.resolve(param_path);
    console.log('Not developed yet, please contact the author by snomiao@gmail.com. ');
    param_path;
}
exports.remove_invalid = remove_invalid;
function add(param_path) {
    // [command line - Adding a directory to the PATH environment variable in Windows - Stack Overflow]( https://stackoverflow.com/questions/9546324/adding-a-directory-to-the-path-environment-variable-in-windows )
    param_path = path_1.default.resolve(param_path);
    // console.assert(accessSync(param_path) , 'file doesnt exists!')
    const cmdSet = `SET PATH=%PATH%;"${param_path}"`;
    const cmdSetX = `start "" cmd /k setx path "%path%;${param_path}"`;
    console.log(cmdSetX);
    child_process_1.exec(cmdSetX);
}
exports.add = add;
function resolve(param_path) {
    param_path = path_1.default.resolve(param_path);
    console.log(param_path);
}
exports.resolve = resolve;
function check() {
    console.error('TODO contact snomiao@gmail.com');
    console.log('Not developed yet, please contact the author by snomiao@gmail.com. ');
}
exports.check = check;
