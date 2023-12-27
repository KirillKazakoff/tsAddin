import { setSp } from './setSp';

export const setPortsRu = (spRange: any[][]) => {
    return setSp({
        table: spRange,
        type: 'portsRu',
        headers: {
            code: 'Краткое наименование',
            fullName: 'Полное наименование',
            phone: 'Телефон',
            director: 'Директор',
            mail: 'Почта',
        },
        row: (r) => ({
            code: r.code,
            director: r.director,
            mail: r.mail,
            name: r.fullName,
            phone: r.phone,
        }),
    });
};

export type PortRuT = ReturnType<typeof setPortsRu>[string];
