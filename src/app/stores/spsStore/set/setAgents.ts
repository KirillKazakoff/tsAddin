import { setSp } from './setSp';

export const setAgents = (spRange: any[][]) => {
    const res = setSp({
        type: 'agents',
        table: spRange,
        headers: {
            name: 'Contractor',
            signatoryEng: 'Signatory',
            signatoryRus: 'Signatory RUS',
            beneficiaryBank: 'BENEFICIARY’S BANK',
            branch: 'Branch Name',
            bankAddress: 'Bank Address',
            acNo: 'A/C NO.',
            swift: 'SWIFT',
            address: 'Address',
            code: 'Code',
        },
        row: (r) => ({
            code: r.code,
            eng: {
                signatory: r.signatoryEng,
            },
            ru: {
                signatory: r.signatoryRus,
            },
            acNo: r.acNo,
            address: r.address,
            bankAddress: r.bankAddress,
            branch: r.branch,
            beneficiaryBank: r.beneficiaryBank,
            name: r.name,
            swift: r.swift,
        }),
    });

    return res;
};

export type AgentT = ReturnType<typeof setAgents>[string];
