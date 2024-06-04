/* eslint-disable react/no-unknown-property */
import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

type PropsT = { onChange: (file: File) => void };

export default function FileDropzone({ onChange }: PropsT) {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            acceptedFiles.forEach(onChange);
        },
        [onChange],
    );

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        isDragActive,
    } = useDropzone({
        onDrop,
    });

    const className = useMemo(() => {
        const styles = {
            focused: isFocused || isDragActive ? 'dropzone-focused' : '',
            dragReject: isDragReject ? 'dropzone-reject' : '',
            dragAccept: isDragAccept ? 'dropzone-accept' : '',
        };

        return `${Object.values(styles).join(' ')} dropzone-base`;
    }, [isFocused, isDragActive, isDragReject, isDragAccept]);

    return (
        <div {...getRootProps()} className={className}>
            <input
                {...getInputProps({ className: 'dropzone-base' })}
                directory=''
                webkitdirectory=''
                type='file'
            />
            <p>Drag drop or click to select files</p>
        </div>
    );
}
