import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { addRowsDT } from './addRowDT';
import FileDropzone from '../../components/FileDropzone';

export const DTRoute = observer(() => {
    // debug
    useEffect(() => {
        const url = {
            init: './assets/DT_XML.xml',
            vtd: './assets/ВТД.xml',
            pvd: './assets/ПВД.xml',
            ek10: './assets/ЭК10.xml',
            ed: './assets/ED.xml',
        };

        const reader = new FileReader();

        reader.onload = async function callback() {
            addRowsDT({ xml: reader.result });
        };

        fetch(url.ed).then((res) => {
            res.blob().then((blob) => {
                reader.readAsText(blob);
            });
        });
    }, []);

    const loadFile = (file: File) => {
        if (!file.name.toLowerCase().includes('xml')) return;

        const reader = new FileReader();

        reader.onload = async function callback() {
            addRowsDT({ xml: reader.result });
        };

        reader.readAsText(file);
    };

    return (
        <div>
            <h1>DT Route</h1>
            <FileDropzone onChange={loadFile} />
        </div>
    );
});
