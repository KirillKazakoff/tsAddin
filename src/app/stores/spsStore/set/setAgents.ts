/* eslint-disable no-param-reassign */
import { AgentsT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setAgents = (spRange: any[][]) => {
    spRange.shift();
    const transformed = spRange.reduce<AgentsT>((total, row) => {
        const [
            name,
            signatoryEng,
            signatoryRu,
            beneficiaryBank,
            branch,
            bankAdress,
            acNo,
            swift,
            adress,
            code,
        ] = row;

        total[code] = {
            code,
            eng: {
                signatory: signatoryEng,
            },
            ru: {
                signatory: signatoryRu,
            },
            name: name.toUpperCase(),
            beneficiaryBank,
            branch,
            bankAddress: bankAdress,
            acNo,
            swift,
            address: adress,
        };
        return total;
    }, {});

    spsStore.setSp.agents(transformed);
};
