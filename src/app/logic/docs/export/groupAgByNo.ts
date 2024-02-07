/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { setMSC } from '../../../stores/tablesStore/utils/setMSC';
import { setCOHCStatus } from './setCOHCStatus';
import { groupTotal } from '../../utils/groupify/groupTotal';
import { CertificateRowT } from '../../../stores/tablesStore/set/setCertificates';
import { getCostGoodsStr } from './сontractTmp/getCostGoodsStr';

export const groupAgByNo = () => {
    const res = groupTotal({
        rows: _.cloneDeep(exportContractStore.currentTable),
        input: (row) => ({
            init: () => {
                if (row.msc) setMSC(row);
                return true;
            },
            code: row.id,
            groupedBy: {
                invoices: {
                    code: row.invoice,
                    groupedBy: {
                        product: { code: row.product.code },
                        productPack: { code: row.blNo + row.product.code + row.pack },
                        productSort: { code: row.product.code + row.pack + row.sort },
                    },
                },
                bl: {
                    code: row.blNo,
                    groupedBy: {
                        product: { code: row.product.code + row.pack },
                        productSort: { code: row.product.code + row.sort },
                    },
                },
            },
            additional: { cohc: 'no' },
            // prettier-ignore
            groupModify: (agreement) => {
                agreement.additional.cohc = setCOHCStatus(agreement.rows as CertificateRowT[]);
                return true;
            },
        }),
    });

    return res;
};

export type ExportGroupT = ReturnType<typeof groupAgByNo>[number];
