import portLetterStore from '../../../../stores/docsStores/portLetterStore';

export const getPortLetterNo = (portLetterNo: string) => {
    const { fields } = portLetterStore;
    if (!fields.correctedNo) return portLetterNo;

    const regExp = /№ \d*/;
    const no = portLetterNo.match(regExp)[0];
    const [first, second] = portLetterNo.split(regExp);

    return `${first}${no}/${fields.correctedNo}${second}`;
};
