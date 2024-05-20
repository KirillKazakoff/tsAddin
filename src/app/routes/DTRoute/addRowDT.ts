import { xmlParse } from './xmlParse';

type SettignsT = {
    id: string;
    xml: any;
};

export const addRowsDT = async ({ id, xml }: SettignsT) => {
    const parsedXML = await xmlParse(xml);
    // parsedXML.map((r) => [id, r.]);
    console.log(parsedXML);

    await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getItem('DT');
        const table = sheet.tables.getItem('DT');

        // table.rows.add(null, [
        //     [
        //         id,
        //         '2',
        //         '3',
        //         '4',
        //         '5',
        //         '6',
        //         '7',
        //         '8',
        //         '9',
        //         '10',
        //         '11',
        //         '12',
        //         '13',
        //         '14',
        //         '15',
        //     ],
        // ]);
    });
};
