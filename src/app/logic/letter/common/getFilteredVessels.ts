import { VesselT } from '../../../types/typesSP';
import tablesStore from '../../../stores/tablesStore/tablesStore';

// LetterSelects
export const getFilteredVessels = () => {
    const vessels = tablesStore.matesT.reduce<VesselT[]>((total, row) => {
        if (total.some((vessel) => vessel.code === row.vessel.code)) {
            return total;
        }

        total.push(row.vessel);
        return total;
    }, []);

    return vessels;
};

export const getVesselsStrRu = () => {
    return getFilteredVessels().map((vessel) => vessel.ru.name);
};

export const getVesselsStrEng = () => {
    return getFilteredVessels().map((vessel) => vessel.eng.name);
};
