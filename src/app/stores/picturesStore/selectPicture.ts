import { PictureKey } from './picturesStore';

const switchPictureGet = (codeName: string): PictureKey | false => {
    switch (codeName) {
        case 'ТРК':
            return 'Seal_TRK';
        case 'МСИ':
            return 'Seal_MSI';
        case 'KTI':
            return 'Seal_KTI';

        case 'Котов М.Н.':
            return 'Sign_KOTOVMN';
        case 'Котов Н.М.':
            return 'Sign_KOTOVNM';
        case 'KTI_sign':
            return 'Sign_SOJI';
        case 'Крузина М.Н.':
            return 'Sign_KRUZINAMN';

        default:
            return false;
    }
};

export const selectPicture = (codeName: string): PictureKey => {
    // prettier-ignore

    const res = switchPictureGet(codeName);
    if (!res) throw new Error('Нет такой картинки');

    return res;
};
