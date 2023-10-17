export const calcFreezing = (product: string, vessel: string) => {
    const suffix = product.split(' ').pop();

    if (!suffix.includes('/')) return '';
    if (suffix === 'с/м') return '';
    if (vessel.includes('Вестерн')) return 'Brine';
    return 'Air';
};
