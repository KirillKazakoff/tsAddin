import picturesStore from '../../stores/picturesStore/picturesStore';

export const initExcelImages = async (context: Excel.RequestContext) => {
    const { worksheets } = context.workbook;

    try {
        const { shapes } = worksheets.getItem('Картинки');
        const pictures = Object.keys(picturesStore.pictures).map((key) => {
            return { key, base64: shapes.getItem(key).getAsImage('PNG') };
        });

        await context.sync();

        pictures.forEach((item) => picturesStore.setBase64(item.key, item.base64.value));
        picturesStore.setIsPicturesFound(true);
    } catch (e) {
        picturesStore.setIsPicturesFound(false);
    }
};
