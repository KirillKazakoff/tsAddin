import { useInitSection } from '../../../components/Form/useInitSection';
import { useMyFormik } from '../../../components/Form/useMyFormik';
import { groupSalesContract } from './groupSalesContract';
import salesContractStore from '../../../stores/docsStores/salesContractStore';
import { initSalesContractTmp } from './initSalesContractTmp';
import { initSalesInvoiceTmp } from './initSalesInvoiceTmp';

export const useInitSalesSection = () => {
    const formik = useMyFormik({
        store: salesContractStore,
        initialFields: {
            isSortGroup: true,
        },
        validateCb: () => {},
    });

    return useInitSection({
        store: salesContractStore,
        docs: groupSalesContract(),
        getSettings: (contract) => ({
            formik,
            createDoc: () => {
                const { id: contractNo, isLive } = contract.record;

                return {
                    tmpPath: isLive ? 'salesContractLive' : 'salesContract',
                    fileName: `${contract.record.buyer.code} ${contractNo}`,
                    initTmpsCb: async (book) => {
                        await initSalesContractTmp(book, contract);
                        await initSalesInvoiceTmp(book, contract);
                    },
                };
            },
            title: `Контракт №${contract?.record?.id}`,
        }),
    });
};
