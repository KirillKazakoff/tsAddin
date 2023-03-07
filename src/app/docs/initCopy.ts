/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';

export const initCopy = (movementBook: any) => {
    const copy = _.cloneDeep(movementBook);
    copy.eachSheet((ws: any) => {
        if (ws.name !== 'BL') copy.removeWorksheet(ws.name);
    });

    return copy;
};
