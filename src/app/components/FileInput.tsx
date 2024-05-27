import React, { useRef } from 'react';

type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileInput = ({ onChange, ...rest }: Props) => {
    const ref = useRef<HTMLInputElement>();

    return (
        <div>
            <label>
                Click to select some files...
                <input
                    multiple
                    ref={ref}
                    {...rest}
                    style={{ display: 'none' }}
                    type=''
                    onChange={onChange}
                />
            </label>
        </div>
    );
};

export default FileInput;
