export interface baseItem {
    id: number
    name: string
    price: number
    description: string
    icon: string
}

export interface ConsumableItem extends baseItem {
    effect: {
        thirst?: number,
        hunger?: number
    }
}

export type Item = baseItem | ConsumableItem

export type Inventory = {
    item: Item,
    amount: number
}[]