import { initRange } from '../../utils/initRange';

export const initVessels = (worksheets: Excel.WorksheetCollection) => {
    const { range } = initRange(worksheets, 'Суда', 'SPSudno');
    return range;
    // const wsVessels = worksheets.getItem('Суда');
    // const tableSrc = wsVessels.tables.getItem('SPSudno');
    // const spVesselsRange = tableSrc.getRange();

    // spVesselsRange.load('values');
    // return spVesselsRange;
};
