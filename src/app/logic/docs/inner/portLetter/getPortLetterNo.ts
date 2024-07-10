import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { getNowDate } from '../../../excel/utils/getExcelDate';
import { indexToStr } from '../../../utils/indexToStr';
import { FescoGroupT } from '../fescoLetter/groupFesco';
import { InnerGroupT } from '../groupInnerContracts';

export const getPortLetterNo = (doc: InnerGroupT | FescoGroupT) => {
    const { record } = doc;

    const letterIndex = `${indexToStr(record.row.id)} от ${
        portLetterStore.fields.dateLetter || getNowDate()
    }`;

    if (doc.record.type === 'fescoContainers') {
        const docF = doc as FescoGroupT;
        const { reiceNo } = docF.record;
        return `Исх. № ${reiceNo} ${getNowDate()}`;
    }

    const portLetterNo = `Исх. № ${`${record.mateRow.reice}-` || ''}${letterIndex}`;

    const { fields } = portLetterStore;
    if (!fields.correctedNo) return portLetterNo;

    const regExp = /№ \d*/;
    const no = portLetterNo.match(regExp)[0];
    const [first, second] = portLetterNo.split(regExp);

    return `${first}${no}/${fields.correctedNo}${second}`;
};
