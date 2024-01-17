/* eslint-disable no-param-reassign */
import { ExportRowT } from '../set/setExport';

export const setMSC = (row: ExportRowT) => {
    const { eng, ru } = row.product;

    if (row.product.eng.name.includes('MSC')) return;

    row.product.ru.name = `MSC ${ru.name}`;
    row.product.eng.name = `MSC ${eng.name}`;
};
