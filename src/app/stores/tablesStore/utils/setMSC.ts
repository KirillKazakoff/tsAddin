/* eslint-disable no-param-reassign */
import { ExportRowT } from '../../../types/typesTables';

export const setMSC = (row: ExportRowT) => {
    const { eng, ru } = row.product;

    ru.name = `MSC ${ru.name}`;
    eng.name = `MSC ${eng.name}`;
};
