declare module "*.png"{
    const content: string;
    export = content;
}
declare module "*.jpg"{
    const content: string;
    export default content;
}