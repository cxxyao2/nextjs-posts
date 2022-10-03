/**
 *
 * @param {string} key
 * @param {any} value
 * @returns {Record<string,any>}
 */
export function convertError(key, value) {
  if (value instanceof Error) {
    const newValue = Object.getOwnPropertyNames(value).reduce(
      (obj, propName) => {
        obj[propName] = value[propName]
        return obj
      },
      { name: value.name }
    )
    return newValue
  } else {
    return value
  }
}
