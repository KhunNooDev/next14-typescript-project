export const dataUtils = {
  jsonToFormData: (data: any): FormData => {
    const formData = new FormData()
    buildFormData(formData, data)
    return formData
  },
  getImageType: (buffer: Buffer): string => {
    if (buffer[0] === 0xff && buffer[1] === 0xd8) {
      return 'image/jpeg'
    } else if (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a
    ) {
      return 'image/png'
    } else {
      return 'unknown'
    }
  },
  /** Check type of value is number */
  isNumber(x: any): x is number {
    return typeof x === 'number'
  },
  /** Check type of value is string */
  isString(x: any): x is string {
    return typeof x === 'string'
  },
  /** Check type of value is boolean */
  isBoolean(x: any): x is boolean {
    return typeof x === 'boolean'
  },
  /** Check type of value is object */
  isObject(x: any): x is object {
    return typeof x === 'object'
    //  return x !== null && typeof x === 'object';
  },
  /** Check type of value is Blob */
  isBlob(x: any): x is Blob {
    return x instanceof Blob
  },
  /** Check type of value is File */
  isFile(x: any): x is File {
    return x instanceof File
  },
}

const buildFormData = (formData: FormData, data: any, parentKey?: string) => {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    if (Array.isArray(data)) {
      data.forEach((value, index) => {
        buildFormData(formData, value, `${parentKey}[${index}]`)
      })
    } else {
      Object.keys(data).forEach(key => {
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
      })
    }
  } else {
    const value = data == null ? '' : data
    formData.append(parentKey || '', value)
  }
}

/**
 * Replaces placeholders in a string with corresponding values.
 *
 * @param text The original string with placeholders.
 * @param newtexts The values to replace the placeholders with.
 * @returns The string with placeholders replaced by values.
 *
 * @example
 * // Example 1: Using individual arguments
 * let newtxt = ReplaceString('{0} and {1} and {2}', 'a', 'b', 'c');
 *
 * // Example 2: Using an array of values
 * let newtxt = ReplaceString('{0} and {1} and {2}', ['a', 'b', 'c']);
 */
export const ReplaceString = (text: string, ...newtexts: string[]) => {
  for (const [idx, newtext] of newtexts.entries()) {
    text = text.replace(`{${idx}}`, newtext)
  }
  return text
}
