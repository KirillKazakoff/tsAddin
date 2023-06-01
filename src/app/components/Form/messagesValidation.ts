type ValidationMsg = {
    valueMissing?: string;
};
type MessagesT = { [key: string]: ValidationMsg };

export const messages: MessagesT = {
    dischargeDate: {
        valueMissing: 'Введите дату прибытия в порт',
    },
    podpisant: {
        valueMissing: 'Выберите подписанта',
    },
    terms: {
        valueMissing: 'Выберите условия доставки',
    },
    portTamozhnya: {
        valueMissing: 'Выберите город-порт',
    },
    portRu: {
        valueMissing: 'Выберите конкретный порт',
    },
    dateLetter: {
        valueMissing: 'Введите дату письма',
    },
    storageFrom: {
        valueMissing: 'Введите дату хранения продавца с',
    },
    storageTo: {
        valueMissing: 'Введите дату хранения продавца до',
    },
    // cargoToAuto: {
    //     valueMissing: 'Выберите сторону оплачивающую грузовые работы (склад-авто)',
    // },
    // cargoToStorage: {
    //     valueMissing: 'Выберите сторону оплачивающую грузовые работы (борт-склад)',
    // },
};
