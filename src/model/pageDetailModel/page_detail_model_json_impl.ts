import { i3Element, i7Element, PageDetailModel } from "./page_detail_model";
import { DetailPageJson } from "../../type/detail_page_json";
import { impossibleError } from "../../type/impossible_error";

function htmlStringToDiv(htmlString: string) {
    const divElement = document.createElement("div");
    htmlString = htmlString.trim();
    divElement.innerHTML = htmlString;
    return divElement;
}

export class PageDetailModelJsonImpl extends PageDetailModel {
    pageJson: DetailPageJson;

    constructor(pageJson: DetailPageJson, i3: i3Element, i7: i7Element) {
        super(i3, i7);
        this.pageJson = pageJson;
    }

    static fromJson(
        pageJson: DetailPageJson,
    ): [PageDetailModelJsonImpl, undefined] | [undefined, Error] {
        const [i3, i3Error] = i3Element.fromElement(
            htmlStringToDiv(pageJson.i3),
        );
        if (i3Error != undefined) {
            return [undefined, i3Error];
        }
        if (i3 == undefined) {
            return [undefined, impossibleError];
        }
        const [i7, i7Error] = i7Element.fromElement(
            htmlStringToDiv(pageJson.i7),
        );
        if (i7Error != undefined) {
            return [undefined, i7Error];
        }
        if (i7 == undefined) {
            return [undefined, impossibleError];
        }
        return [new PageDetailModelJsonImpl(pageJson, i3, i7), undefined];
    }
}
