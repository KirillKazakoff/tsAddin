/* eslint-disable no-param-reassign */
import { ClientRuT, ClientsRuT } from '../../../types/typesSP';
import spsStore from '../spsStore';

export const setClientsRu = (spRange: any[][]) => {
    spRange.shift();
    const transformed = spRange.reduce<ClientsRuT>((total, row) => {
        const [
            name,
            formOrgReq,
            codeName,
            codeNameOrgReq,
            inn,
            phone,
            mail,
            mailReq,
            phoneFaxReq,
            addressReq,
            kppReq,
            ogrnReq,
            okpoReq,
            bankNameReq,
            bikReq,
            ksReq,
            rsReq,
            faceReq,
            fullNameReq,
            sexReq,
            basisReq,
            positionReq,
            shortNameReq,
        ] = row;

        const rowObj: ClientRuT = {
            codeName,
            name,
            inn,
            phone,
            mail,
            req: {
                org: {
                    formName: formOrgReq,
                    codeName: codeNameOrgReq,
                    mail: mailReq,
                    phoneFax: phoneFaxReq,
                    address: addressReq,
                    kpp: kppReq,
                    ogrn: ogrnReq,
                    okpo: okpoReq,
                },
                bank: {
                    name: bankNameReq,
                    bik: bikReq,
                    ks: ksReq,
                    rs: rsReq,
                },
                podpisant: {
                    face: faceReq,
                    fullName: fullNameReq,
                    shortName: shortNameReq,
                    sex: sexReq,
                    basis: basisReq,
                    position: positionReq,
                },
            },
        };

        total[codeName] = rowObj;

        return total;
    }, {});

    spsStore.setSp.clientsRu(transformed);
};
