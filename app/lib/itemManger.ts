import { Item } from "../types";
import loadedItems from "./items.json";

export class ItemLoader {
    private items: Map<number, any> = new Map()

    constructor() {
        Object.keys(loadedItems)
            .forEach((key: any) => {
                this.items.set(loadedItems[key].id, loadedItems[key])
            })
    }

    public getItem(id: number): Item {
        return this.items.get(id)
    }

    public getItems() {
        return this.items
    }
}