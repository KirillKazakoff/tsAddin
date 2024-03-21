import popupStore from '../popupStore.ts/popupStore';
import { PictureKey } from './picturesStore';

const switchPictureGet = (codeName: string): PictureKey => {
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
        case 'Кузьменко Е.А.':
            return 'Sign_KUZMENKOEA';
        case 'Крузина М.Н.':
            return 'Sign_KRUZINAMN';
        case 'SE JI YOUNG':
            return 'Sign_SOJI';
        case 'OCEANIC':
            return 'Sign_OCEANIC';
        case 'CHANGRUN':
            return 'Sign_CHANGRUN';

        default:
            return '';
    }
};

export const selectPicture = (codeName: string): PictureKey => {
    const res = switchPictureGet(codeName);

    console.log(res);

    if (!res) {
        popupStore.pushStatus({
            title: `Не найдено изображение ${codeName.toUpperCase()}`,
            desc: 'Возможно не заполнен лист с изображениями',
        });
    }

    return res;
};
