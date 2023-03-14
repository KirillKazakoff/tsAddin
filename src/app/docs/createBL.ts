/* eslint-disable import/no-extraneous-dependencies */
import ExcelJS from 'exceljs';
import _ from 'lodash';
import { initBlTemplate } from './init/initBlTemplate';
import tablesStore from '../stores/tablesStore/tablesStore';
import { saveFile } from '../utils/create';

function download(url, filename) {
    fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            console.log(link);
        })
        .catch(console.error);
}

export const createBL = async (book: ExcelJS.Workbook) => {
    // download('https://get.geojs.io/v1/ip/geo.json', 'geoip.json');
    // download('data:text/html,HelloWorld!', 'helloWorld.txt');

    try {
        tablesStore.export.forEach(async (row) => {
            const newBook = _.cloneDeep(book);
            initBlTemplate(newBook, row);

            await saveFile(newBook, row.blNo);
            download('data:text/html,HelloWorld!', 'helloWorld.txt');
        });
    } catch (e) {
        console.log(e);
    }
};
