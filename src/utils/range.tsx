export function range(a: number, b?: number): Array<number> {
  if (b) {
    return Array.from({length: b - a}, (_, i) => i + a)
  } else {
    return Array.from({length: a}, (_, i) => i)
  }
}

export function rangeInclusive(a: number, b?: number): Array<number> {
  if (b) {
    return Array.from({length: b - a + 1}, (_, i) => i + a)
  } else {
    return Array.from({length: a + 1}, (_, i) => i)
  }
}