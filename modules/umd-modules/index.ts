import { isPrime } from './math-lib';
isPrime(2);

//ts] “mathLib”指 UMD 全局，但当前文件是模块。请考虑改为添加导入。
//export namespace mathLib
// mathLib.isPrime(2);