/* eslint-disable no-param-reassign */
import { useInitSection } from '../../../components/Form/useInitSection';
import { useMyFormik } from '../../../components/Form/useMyFormik';
import blStore from '../../../stores/docsStores/blStore';
import exportContractStore from '../../../stores/docsStores/exportContractStore';
import { groupByBl } from './groupByBl';
import { initBlTmp } from './initBlTmp';

export const useInitBlSection = () => {
    const formik = useMyFormik({
        store: blStore,
        initialFields: {
            catchZone: '',
            vatsAmount: '',
            isSortable: false,
        },
        validateCb: (errors, values) => {
            const isFCA = exportContractStore.currentTable[0].terms === 'FCA';

            if (!values.catchZone) {
                errors.catchZone = 'valueMissing';
            }
            if (isFCA && !values.vatsAmount) {
                errors.vatsAmount = 'valueMissing';
            }
        },
    });

    return useInitSection({
        store: blStore as any,
        docs: groupByBl(exportContractStore.currentTable),
        // it'd be here in param if need to choose each document separately
        getSettings: (d) => {
            return {
                formik,
                // doc here since no choose document
                createDoc: (doc) => {
                    return {
                        tmpPath: 'bl',
                        initTmpsCb: (book) => initBlTmp(book, doc),
                        fileName: doc.record.blNo,
                    };
                },
            };
        },
    });
};
