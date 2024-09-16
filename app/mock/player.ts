import { ItemLoader } from "../lib/itemManger"
import { Inventory, Item } from "../types"

const adminItemHandler = new ItemLoader()

export const basePlayerMock: {
    cicles: number,
    money: number,
    hunger: number,
    thirst: number,
    totalIncomeMade: number,
    inventory: Inventory
} = {
    cicles: 0,
    money: 50,
    hunger: 100,
    thirst: 100,
    totalIncomeMade: 0,
    inventory: [
        {
            item: adminItemHandler.getItem(1),
            amount: 5
        },
        {
            item: adminItemHandler.getItem(2),
            amount: 5
        },
        {
            item: adminItemHandler.getItem(3),
            amount: 5
        }
    ]
}