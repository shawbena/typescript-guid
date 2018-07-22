declare module "hot-new-module";

declare module "*!text"{
	const content: string;
	export default content;
}

declare module "json!*"{
	const value: any;
	export default value;
}

declare module "*.png"{
    const content: string;
    export = content;
}
declare module "*.jpg"{
    const content: string;
    export default content;
}