import { checkOperation } from '../../logic/letter/common/checkOperation';
import { VesselT } from '../../types/typesSP';
import tablesStore from '../tablesStore/tablesStore';
import { selectVesselSp } from './select';

// LetterSelects
export const selectFilteredMates = () => {
    return tablesStore.matesT.filter((row) => checkOperation(row));
};

export const selectFilteredVessels = () => {
    const mates = selectFilteredMates();
    const vessels = mates.reduce<VesselT[]>((total, row) => {
        const vessel = selectVesselSp(row.vessel);
        if (total.some((vesselInArr) => vesselInArr.codeName === vessel.codeName)) {
            return total;
        }

        total.push(vessel);
        return total;
    }, []);

    return vessels;
};

export const selectVesselsStr = () => {
    return selectFilteredVessels().map((vessel) => vessel.ru.name);
};

export const selectVesselsStrEng = () => {
    return selectFilteredVessels().map((vessel) => vessel.eng.name);
};
