import { impossibleError } from "../../type/impossible_error";

class PageParseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PageParseError";
    }
}

export class i3Element {
    i3: HTMLDivElement;
    anchorChild: HTMLAnchorElement;
    img: HTMLImageElement;

    private constructor(
        i3: HTMLDivElement,
        anchorChild: HTMLAnchorElement,
        img: HTMLImageElement,
    ) {
        this.i3 = i3;
        this.anchorChild = anchorChild;
        this.img = img;
    }

    static fromElement(
        i3: HTMLDivElement,
    ): [i3Element, undefined] | [undefined, Error] {
        const [anchorChild, error] = this.getAnchorChild(i3);
        if (error != undefined) {
            return [undefined, error];
        }
        if (anchorChild == undefined) {
            return [undefined, impossibleError];
        }
        const [img, imgError] = this.getImg(anchorChild);
        if (imgError != undefined) {
            return [undefined, imgError];
        }
        if (img == undefined) {
            return [undefined, impossibleError];
        }
        return [new i3Element(i3, anchorChild, img), undefined];
    }

    static getImg(
        anchorChild: HTMLAnchorElement,
    ): [HTMLImageElement, undefined] | [undefined, Error] {
        if (anchorChild.children.length != 1) {
            return [
                undefined,
                new PageParseError(
                    "Should only have one child for i3 > anchor",
                ),
            ];
        }
        const img = anchorChild.children[0];
        if (!(img instanceof HTMLImageElement)) {
            return [
                undefined,
                new PageParseError("The child for i3 div > anchor is not img"),
            ];
        }
        return [img, undefined];
    }

    private static getAnchorChild(
        i3: HTMLDivElement,
    ): [HTMLAnchorElement, undefined] | [undefined, Error] {
        if (i3.children.length != 1) {
            return [
                undefined,
                new PageParseError("Should only have one children for i3 div"),
            ];
        }
        const anchorChild = i3.children[0];
        if (!(anchorChild instanceof HTMLAnchorElement)) {
            return [
                undefined,
                new PageParseError("The child for i3 div is not anchor"),
            ];
        }
        return [anchorChild, undefined];
    }
}

export class i7Element {
    i7: HTMLDivElement;

    private constructor(i7: HTMLDivElement) {
        this.i7 = i7;
    }

    static fromElement(
        i7: HTMLDivElement,
    ): [i7Element, undefined] | [undefined, Error] {
        return [new i7Element(i7), undefined];
    }
}

export abstract class PageDetailModel {
    i3: i3Element;
    i7: i7Element;

    protected constructor(i3: i3Element, i7: i7Element) {
        this.i3 = i3;
        this.i7 = i7;
    }

    getImgSrc(): string {
        return this.i3.img.src;
    }
}
