/* eslint-disable no-param-reassign */
import { useInitSection } from '../../../../components/Form/useInitSection';
import { useMyFormik } from '../../../../components/Form/useMyFormik';
import innerContractStore from '../../../../stores/docsStores/innerContractStore';
import { groupInnerContracts } from '../groupInnerContracts';
import { initInnerContractTmp } from './initInnerContractTmp';

export const useInitInnerContract = () => {
    const formikObj = useMyFormik({
        store: innerContractStore,
        initialFields: {
            podpisant: '',
            isPictures: false,
        },
        validateCb: (errors, values) => {
            if (!values.podpisant) {
                errors.podpisant = 'valueMissing';
            }
        },
    });

    const { initObj, formik } = useInitSection({
        store: innerContractStore as any,
        docs: groupInnerContracts(),
        getSettings: () => ({
            formik: formikObj,
            createDoc: (contract) => {
                const { buyer, id } = contract.record.row;

                return {
                    fileName: `Договор №${id} ${buyer.code}`,
                    initTmpsCb: async (book) => initInnerContractTmp(book, contract),
                    tmpPath: 'innerContract',
                };
            },
        }),
    });

    const contracts = initObj.docs.reduce<typeof initObj.docs>((invoices, contract) => {
        if (contract.record.row.id.toString().toLowerCase().includes('счет')) {
            return invoices;
        }
        invoices.push(contract);
        return invoices;
    }, []);

    return { initObj, formik, contracts };
};
