import React, { useEffect, useRef, useState } from 'react';

type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileInput = ({ onChange, ...rest }: Props) => {
    const ref = useRef<HTMLInputElement>();
    const [file, setFile] = useState<File[]>();

    useEffect(() => {
        console.log(ref.current.value);
    }, []);

    return (
        <div>
            <label>
                Click to select some files...
                <input
                    multiple
                    ref={ref}
                    {...rest}
                    style={{ display: 'none' }}
                    type='file'
                    onChange={onChange}
                />
            </label>
        </div>
    );
};

export default FileInput;
