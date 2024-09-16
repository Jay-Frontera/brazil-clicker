export interface baseItem {
    id: number
    name: string
    price: number
    description: string
    icon: string
    isConsumable: boolean
}

export interface ConsumableItem extends baseItem {
    isConsumable: true
    effects: {
        thirst?: number,
        hunger?: number
        eatlimit?: number
    }
}

export interface NonConsumableItem extends baseItem {
    isConsumable: false
}

export type Item = ConsumableItem | NonConsumableItem

export type Inventory = {
    item: Item,
    amount: number
}[]


export enum ActionType {
    CONSUME
}