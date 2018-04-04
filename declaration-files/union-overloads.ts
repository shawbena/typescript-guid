export default () => {}

// 怎么实现 Moment?
interface Moment{
    utcOffset(): number;
    utcOffset(b: number|string): Moment;
}

// let m: Moment = {
//     utcOffset(b?: number|string): number|Moment{
//         if(!b){
//             return 0;
//         }else{
//             return this;
//         }
//     }
// };
function utcOffset(x: number|string){}
function fn(x: number|string){
    return utcOffset(x);
}