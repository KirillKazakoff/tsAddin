export function formatCount(count: number | string) {
    const str = count.toString();
    return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}
