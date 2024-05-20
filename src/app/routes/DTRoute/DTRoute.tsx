import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import FileInput from '../../components/FileInput';
import { addRowsDT } from './addRowDT';

export const DTRoute = observer(() => {
    const reader = new FileReader();

    reader.onload = async function callback() {
        addRowsDT({ id: '100', xml: reader.result });
    };

    const url = {
        init: './assets/DT_XML.xml',
        vtd: './assets/ВТД.xml',
        pvd: './assets/ПВД.xml',
        ek10: './assets/ЭК10.xml',
    };

    useEffect(() => {
        fetch(url.pvd).then((res) => {
            res.blob().then((blob) => {
                reader.readAsText(blob);
            });
        });
    }, []);

    // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { files } = e.target;

    //     reader.onload = async function callback() {
    //         xmlParse(reader.result);
    //     };

    //     if (!files[0]) return;
    //     reader.readAsText(files[0]);
    // };

    return (
        <div>
            <h1>DT Route</h1>
            <FileInput
                onChange={(e) => {
                    console.log(e.currentTarget.files[0].name);
                }}
            />
        </div>
    );
});
