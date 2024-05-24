/* eslint-disable no-param-reassign */
import { useInitSection } from '../../../../components/Form/useInitSection';
import { useMyFormik } from '../../../../components/Form/useMyFormik';
import fescoLetterStore from '../../../../stores/docsStores/fescoLetterStore';
import { groupFesco } from './groupFesco';
import { initFescoTmp } from './initFescoTmp';

export const useInitFescoLetter = () => {
    const formik = useMyFormik({
        store: fescoLetterStore,
        initialFields: {
            isPictures: true,
            podpisant: '',
            reiceNo: '',
        },
        validateCb(errors, values) {
            if (!values.podpisant) errors.podpisant = 'valueMissing';
            if (!values.reiceNo) errors.reiceNo = 'valueMissing';
        },
    });

    return useInitSection({
        store: fescoLetterStore as any,
        docs: groupFesco(),
        getSettings: () => ({
            formik,
            createDoc: (doc) => {
                const { buyer } = doc.record;
                console.log(doc);
                const { placesTotal } = doc.total;

                return {
                    tmpPath: 'fesco',
                    initTmpsCb: async (book) => initFescoTmp(book, doc),
                    fileName: `Письмо ${buyer.code} ${placesTotal.count.toFixed(0)}`,
                };
            },
        }),
    });
};
