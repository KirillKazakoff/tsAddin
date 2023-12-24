import { setSp } from './setSp';

export const setPortsZarubezh = (spRange: any[][]) => {
    setSp({
        table: spRange,
        type: 'portsZarubezh',
        headers: {
            code: 'Порт',
            nameEng: 'Port',
            countryEng: 'Country',
            countryRu: 'Страна',
            countryNameFullRu: 'Страна полное рус',
            countryNameFullEng: 'Country full eng',
        },
        row: (r) => ({
            code: r.code,
            ru: {
                country: r.countryRu,
                countryFull: r.countryNameFullRu,
                name: r.code,
            },
            eng: {
                country: r.countryEng,
                countryFull: r.countryNameFullEng,
                name: r.nameEng,
            },
        }),
    });
};
