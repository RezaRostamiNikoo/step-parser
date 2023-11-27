import * as  IFC4 from 'ifc-schema-ts';
import { DefinitionNode } from '../nodes/DefinitionNode';
import { ExpressionNode } from '../nodes/ExpressionNode';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

export class IfcModel {
    public static model;
    /** holds header section of an SPF file */
    private _metadata: Array<ExpressionNode> = []
    /** holds the data section of an SPT file */
    private _definitions: Map<string, DefinitionNode> = new Map()
    private _values: Array<any>

    constructor() {
        IfcModel.model = this
    }

    get Data(): Map<string, DefinitionNode> { return this._definitions }
    get Header(): Array<ExpressionNode> { return this._metadata }

    getValues() {
        if (this._values) return this._values
        const result = []
        this._definitions.forEach((value, index) => result.push(value.getValue()))
        return this._values = result
    }

    /**
     * adds a new definition to the ifc Model
     * @param {string} index 
     * @param {DefinitionNode} definition 
     * @returns {this}
     */
    addDefinition(index: string, definition: DefinitionNode): this {
        this._definitions.set(index, definition)
        delete this._values
        return this
    }

    /**
     * adds a meta data to the to the ifc Model' header section
     * @param {DefiniExpressionNodetionNode} meta 
     * @returns {this}
     */
    addHeaderMetadata(meta: ExpressionNode): this {
        this._metadata.push(meta)
        return this
    }

    private _relDefinesByProperties: IFC4.IfcRelDefinesByProperties[]

    get RelDefinesByProperties(): IFC4.IfcRelDefinesByProperties[] {
        if (this._relDefinesByProperties) return this._relDefinesByProperties
        return this._relDefinesByProperties = this.getValues().filter(e => e instanceof IFC4.IfcRelDefinesByProperties)
    }

    toSPF(): string {
        const result: string[] = []
        result.push("ISO-10303-21;\n")
        result.push("HEADER;\n")
        this._metadata.forEach(h => result.push(h.toString() + ";"))
        result.push("\nENDSEC;\n\n")
        result.push("DATA;\n")
        this._definitions.forEach(d => result.push(d.toString() + ";"))
        result.push("\nENDSEC;\n\n")
        result.push("END-ISO-10303-21;")
        return result.join("\n")
    }

    ////////////////////////////////////

    /**
     * returns all the entity instance in ifc model
     * @param {string} name Entity Name in ifc schema
     */
    getEntities(name: string): IFC4.Entity[] {
        // console.log(IFC4[entityName])
        return this.getValues().filter(e => e instanceof IFC4[name])
    }

    /**
     * returns all object definitions which are like entity name or all of theme
     * @param {string} entityName 
     * @returns 
     */
    getObjectDefinitions(entityName?: string): IFC4.IfcObjectDefinition[] {
        return this.getValues().filter(e => e instanceof IFC4.IfcObjectDefinition && (entityName ? e instanceof IFC4[entityName] : true))
    }
    getObjectDefinition(globalId: string): IFC4.IfcObjectDefinition {
        return this.getObjectDefinitions().find(o => o.GlobalId === globalId) as IFC4.IfcObjectDefinition
    }
    /**
     * 
     * @param {IFC4.IfcObjectDefinition} ifcObjectDefinition 
     * @returns 
     */
    private getPropertySetDefinitionSelects(globalId: "string"): IFC4.IfcPropertySetDefinitionSelect[]
    private getPropertySetDefinitionSelects(ifcObjectDefinition: IFC4.IfcObjectDefinition): IFC4.IfcPropertySetDefinitionSelect[]
    private getPropertySetDefinitionSelects(arg: unknown): IFC4.IfcPropertySetDefinitionSelect[] {
        const GlobalId = typeof arg === "string" ? arg : (arg as IFC4.IfcObjectDefinition).GlobalId
        const rels = this.getEntities("IfcRelDefinesByProperties") as IFC4.IfcRelDefinesByProperties[]
        return rels.filter(rel => rel.RelatedObjects.some(o => o.GlobalId == GlobalId))
            .map(rel => rel.RelatingPropertyDefinition) as IFC4.IfcPropertySetDefinitionSelect[]
    }

    private getPropertySetDefinitions(globalId: string): IFC4.IfcPropertySetDefinition[]
    private getPropertySetDefinitions(ifcObjectDefinition: IFC4.IfcObjectDefinition): IFC4.IfcPropertySetDefinition[]
    private getPropertySetDefinitions(arg: unknown): IFC4.IfcPropertySetDefinition[] {
        // const GlobalId = typeof arg === "string" ? arg : (arg as IFC4.IfcObjectDefinition).GlobalId
        const p = this.getPropertySetDefinitionSelects(arg)
        return p.flatMap(p => {
            if ((p as IFC4.IfcPropertySetDefinitionSet_wrapper).IfcPropertySetDefinition) return (p as IFC4.IfcPropertySetDefinitionSet_wrapper).IfcPropertySetDefinition
            return [p as IFC4.IfcPropertySetDefinition]
        })
    }

    getPropertySets(globalId: string): IFC4.IfcPropertySet[]
    getPropertySets(ifcObjectDefinition: IFC4.IfcObjectDefinition): IFC4.IfcPropertySet[]
    getPropertySets(arg: unknown): IFC4.IfcPropertySet[] {
        // const GlobalId = typeof arg === "string" ? arg : (arg as IFC4.IfcObjectDefinition).GlobalId
        return this.getPropertySetDefinitions(arg).filter(p => p instanceof IFC4.IfcPropertySet) as IFC4.IfcPropertySet[]
    }

    getPropertySet(globalId: string, propertySetName: string): IFC4.IfcPropertySet
    getPropertySet(ifcObjectDefinition: IFC4.IfcObjectDefinition, propertySetName: string): IFC4.IfcPropertySet
    getPropertySet(arg: unknown, propertySetName: string): IFC4.IfcPropertySet {
        // const GlobalId = typeof arg === "string" ? arg : (arg as IFC4.IfcObjectDefinition).GlobalId
        return this.getPropertySetDefinitions(arg).find(p => p instanceof IFC4.IfcPropertySet && p.Name._simple_value === propertySetName) as IFC4.IfcPropertySet
    }

    hasPropertySet(globalId: string, propertySetName: string): boolean
    hasPropertySet(ifcObjectDefinition: IFC4.IfcObjectDefinition, propertySetName: string): boolean
    hasPropertySet(arg: unknown, propertySetName: string): boolean {
        const oss = this.getPropertySets(arg)
        const ps = oss.some(ps => {
            return (typeof ps.Name === "string")
                ? ps.Name === propertySetName
                : ps.Name._simple_value === propertySetName
        })

        return ps
    }

    hasProperty(globalId: string, property: string, propertySetName?: string): boolean
    hasProperty(ifcObjectDefinition: IFC4.IfcObjectDefinition, property: string, propertySetName?: string): boolean
    hasProperty(arg: unknown, property: string, propertySetName?: string): boolean {
        const psds = this.getPropertySetDefinitions(arg)
        const psdsf = !propertySetName ? psds : psds.filter(ps => {
            return typeof ps.Name === "string"
                ? ps.Name === propertySetName
                : ps.Name._simple_value === propertySetName
        })
        if (!psdsf.length) return false
        return psdsf.some(psd => psd.____hasProperty(property))
    }
}