export class InventoryDTO {
    orgCode : string
    cmpCode : string
    inventoryId : number
    entityType : string
    entityId : string
    skuId : string
    user : string
    inventoryType : string
    nodeId : string
    onHandQty : number
    strOnHandQtyMap : [{ key: string, value: number }]
}