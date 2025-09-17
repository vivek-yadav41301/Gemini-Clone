export function cheackHeading(str) {
    return /^\*\*.*\*$/.test(str);
  }
 export function replaceheadingStarts(str)
  {
    return str.replace(/^(\*)(\*)|(\*)$/g,'')
  }