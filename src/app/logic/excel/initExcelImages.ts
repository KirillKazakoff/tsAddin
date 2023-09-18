import picturesStore from '../../stores/picturesStore/picturesStore';

export const initExcelImages = async (context: Excel.RequestContext) => {
    const { worksheets } = context.workbook;
    const { shapes } = worksheets.getItem('Картинки');
    shapes.load('items');

    // check is pictures worksheet in a book
    try {
        await context.sync();
    } catch (e) {
        picturesStore.setIsPicturesFound(false);
    }

    // get items from worksheet and get base64string for pics
    const itemKeys = shapes.items.map((item) => item.name);
    const pictures = itemKeys.map((key) => {
        return { key, base64: shapes.getItem(key).getAsImage('PNG') };
    });

    await context.sync();

    pictures.forEach((item) => picturesStore.setBase64(item.key, item.base64.value));
    picturesStore.setIsPicturesFound(true);
};
