interface SVGDocument {
    createElement(tagName: any): Element;
}
interface SVGDocument {
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
}
interface SVGDocument {
    createElement(tagName: string): HTMLElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
}

let svg: SVGDocument;
// svg.createElement() "div", "span", "canvas", string, any