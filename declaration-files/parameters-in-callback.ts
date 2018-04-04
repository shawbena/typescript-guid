export default () => {}

interface Fetcher{
    getObject(done: (data: any, elapsedTime: number) => void): void;
}

interface Idone{
    (data: any, elapsedTime: number): () => void;
}

let done = function(data: object){

};

let f: Fetcher = {
    getObject(done){

    }
};

// 函数应该有权决定使用什么参数
// 如果使用接口则必须保持一致
f.getObject(function(){

});