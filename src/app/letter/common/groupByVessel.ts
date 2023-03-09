import type { MateRowT } from '../../types/typesTables';
import letterStore from '../../stores/letterStore/letterStore';

export const groupByVessel = (vessels: string[], table: MateRowT[]) => {
    const checkOperation = ({ operation }: MateRowT) => {
        const { terms, isExport } = letterStore.fields;

        if (operation === 'Внутренний рынок' && !isExport) {
            return true;
        }

        if (!isExport) return false;

        if (operation === 'Экспорт' && terms === 'CFR') {
            return true;
        }
        if (operation === 'Хранение на экспорт' && terms === 'EXW') {
            return true;
        }
        return false;
    };

    return vessels.reduce<MateRowT[][]>((groupVessel, vessel) => {
        const group = table.reduce<MateRowT[]>((total, row) => {
            if (!checkOperation(row)) return total;

            if (vessel === row.vessel) total.push(row);
            return total;
        }, []);

        if (group.length > 0) {
            groupVessel.push(group);
        }

        return groupVessel;
    }, []);
};
