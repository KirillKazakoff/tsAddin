export function formatCount(amount: number) {
    const str = amount.toString();
    return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}
