import * as IFC4 from "ifc-schema-ts"


export function createIfcClass(className: string, args: Array<any>): IFC4.Entity {
    className = Object.keys(IFC4).find((value, index) => value.toUpperCase() === className)
    return new IFC4[className](...args)
}
