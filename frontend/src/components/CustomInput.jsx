import React, { useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
} from '@chakra-ui/react';

function CustomInput({ type, placeholder, label, value, setValue }) {
    const [focused, setFocused] = useState(false);

    const handleBlur = () => {
        if (focused && !value) {
            // Set the error message only when the input is empty and focused
            setValue(''); // Clear the input value to trigger a re-render
        }
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <FormControl isInvalid={focused && !value}>
            <FormLabel textStyle ="body1-md">{label}</FormLabel>
            <Input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={() => setFocused(true)}
            />
            {focused && !value && (
                <FormErrorMessage>{`${label} is required.`}</FormErrorMessage>
            )}
        </FormControl>
    );
}

export default CustomInput;
