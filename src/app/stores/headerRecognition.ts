/* eslint-disable no-param-reassign */
import popupStore from './popupStore.ts/popupStore';

type RecordInputT = Record<string, string>;
type RecordMiddleT<T extends RecordInputT> = Record<keyof T, (string | number)[]>;
type RecordOutputT<T extends RecordInputT> = Record<keyof T, number>;

export const headerRecognition = <T extends RecordInputT>(
    rowSettings: T,
    headers: string[],
    type: string,
    tableType: 'sp' | 'table',
): RecordOutputT<T> => {
    const arrayed = Object.keys(rowSettings).reduce<RecordMiddleT<T>>((total, key) => {
        const header = rowSettings[key];
        total[key as keyof T] = [header, 0];
        return total;
    }, {} as RecordMiddleT<T>);

    Object.values(arrayed).forEach((tuple) => {
        tuple[1] = headers.findIndex((title) => title === tuple[0]);

        if (tuple[1] === -1) {
            popupStore.pushStatus({
                title: `Ошибка в наименовании столбца ${
                    tableType === 'sp' ? 'справочника' : 'таблицы'
                } ${type}`,
                desc: `Проверьте столбец ${tuple[0]}`,
            });
        }
    });

    Object.keys(arrayed).forEach((key) => {
        arrayed[key as keyof T] = arrayed[key][1] as any;
    });

    return arrayed as any;
};
