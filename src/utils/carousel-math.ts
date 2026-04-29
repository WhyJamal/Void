export function mod(value: number, length: number) {
    return ((value % length) + length) % length;
}