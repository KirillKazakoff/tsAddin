/* eslint-disable no-param-reassign */
import { ExportRowT } from '../set/setExport';

export const setMSC = (row: ExportRowT) => {
    const { eng, ru } = row.product;

    if (eng.name.includes('MSC')) return;

    ru.name = `MSC ${ru.name}`;
    eng.name = `MSC ${eng.name}`;
};
