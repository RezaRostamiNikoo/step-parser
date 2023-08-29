
/**
 * This function checks among properties of an Object to see if it has that property or not
 * @param {Object} obj the object that we want to check that property against 
 * @param {string} property the property we ewant to search among the desired object
 * @returns {boolean} return boolean
 */
export function hasOwnProperty(obj: Object, property: string): boolean {
    return Object.prototype.hasOwnProperty.call(obj, property);
}