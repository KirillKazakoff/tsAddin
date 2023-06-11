export const calcFreezing = (product: string, vessel: string) => {
    const suffix = product.split(' ').pop();

    if (!suffix.includes('/')) return '';
    if (suffix === 'с/м') return 'Fresh';
    if (vessel.includes('Вестерн')) return 'Brine';
    return 'Air';
};

// calc vm freeze type

// const vm = {
//     both: ['Атка'],
//     brine: ['Вестерн'],
//     air: ['Харбиз'],
// };
