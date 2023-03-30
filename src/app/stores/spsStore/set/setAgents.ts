/* eslint-disable no-param-reassign */
import { AgentsT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setAgents = (spRange: any[][]) => {
    spRange.shift();
    const transformed = spRange.reduce<AgentsT>((total, row) => {
        const [
            name,
            signatoryEng,
            signatory,
            beneficiaryBank,
            branch,
            bankAdress,
            acNo,
            swift,
            adress,
            code,
        ] = row;

        total[code] = {
            name,
            signatoryEng,
            signatory,
            beneficiaryBank,
            branch,
            bankAdress,
            acNo,
            swift,
            adress,
            code,
        };
        return total;
    }, {});

    console.log(transformed);
    spsStore.setAgents(transformed);
};
