import tablesStore from '../../../stores/tablesStore/tablesStore';
import { createAssortiment } from './createAssortiment';
import { groupAssortiment } from './group/groupAssortiment';

export const useInitAssortimentSection = () => {
    const { exportStorageT, exportT } = tablesStore;
    const rows = [...exportStorageT, ...exportT];

    const assortiment = groupAssortiment(rows);
    const onLoad = async () => createAssortiment(assortiment);

    return onLoad;
};
