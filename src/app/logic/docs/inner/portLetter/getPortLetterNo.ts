import portLetterStore from '../../../../stores/docsStores/portLetterStore';
import { getNowDate } from '../../../excel/utils/getExcelDate';
import { indexToStr } from '../../../utils/indexToStr';
import { InnerGroupT } from '../groupByContractNo';

export const getPortLetterNo = ({ index, record }: InnerGroupT) => {
    const letterIndex = `${indexToStr(record.row.id)} от ${
        portLetterStore.fields.dateLetter || getNowDate()
    }`;

    const portLetterNo = `Исх. № ${`${record.mateRow.reice}-` || ''}${letterIndex}`;

    const { fields } = portLetterStore;
    if (!fields.correctedNo) return portLetterNo;

    const regExp = /№ \d*/;
    const no = portLetterNo.match(regExp)[0];
    const [first, second] = portLetterNo.split(regExp);

    return `${first}${no}/${fields.correctedNo}${second}`;
};
