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
        case 'SE JI YOUNG':
            return 'Sign_SOJI';
        case 'Крузина М.Н.':
            return 'Sign_KRUZINAMN';
        case 'OCEANIC':
            return 'Sign_OCEANIC';
        case 'CHANGRUN':
            return 'Sign_CHANGRUN';

        default:
            return false;
    }
};

export const selectPicture = (codeName: string): PictureKey => {
    const res = switchPictureGet(codeName);
    if (!res) throw new Error(`Отсутствует изображение ${codeName}`);

    return res;
};
