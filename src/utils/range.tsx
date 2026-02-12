export default function range(a: number, b?: number): Array<number> {
  if (b) {
    return Array.from({length: b - a}, (_, i) => i + a)
  } else {
    return Array.from({length: a}, (_, i) => i)
  }
}