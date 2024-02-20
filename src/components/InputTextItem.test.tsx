import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputTextItem from './InputTextItem'; // Adjust the import path as necessary

describe('InputTextItem', () => {
    const mockOnBlur = jest.fn();
    const mockValidateFunc = jest.fn();

    let props = {
        id: 'input1',
        value: 'Initial Value',
        onBlur: mockOnBlur,
        validateFunc: mockValidateFunc,
        placeholder: 'Enter text',
        name: 'testInput',
    };

    beforeEach(() => {
        mockOnBlur.mockClear();
        mockValidateFunc.mockClear().mockReturnValue(""); // Reset and set default return value;
        props = {
            id: 'input1',
            value: 'Initial Value',
            onBlur: mockOnBlur,
            validateFunc: mockValidateFunc,
            placeholder: 'Enter text',
            name: 'testInput',
        };
    });

    it('renders with initial value', () => {
        render(<InputTextItem {...props} />);
        const inputElement = screen.getByPlaceholderText<HTMLInputElement>(props.placeholder);
        expect(inputElement.value).toBe(props.value);
    });

    it('displays error message on validation failure', () => {
        const errorMessage = 'Error message';
        mockValidateFunc.mockReturnValue(errorMessage);
        render(<InputTextItem {...props} shouldValidate={true} />);
        const errorElement = screen.getByText(errorMessage);
        expect(errorElement).toBeInTheDocument();
    });

    it('calls onBlur with the correct parameters', async () => {
        const inputValue = 'Updated Value';
        render(<InputTextItem {...props} />);
        const inputElement = screen.getByPlaceholderText<HTMLInputElement>(props.placeholder);
        fireEvent.blur(inputElement, { target: { value: inputValue } });
        expect(mockOnBlur).toHaveBeenCalledWith({ id: props.id, value: inputValue, valid: true });
    });

    it('updates value on prop change', () => {
        const { rerender } = render(<InputTextItem {...props} />);
        const newValue = 'New Value';
        rerender(<InputTextItem {...props} value={newValue} />);
        const inputElement = screen.getByPlaceholderText<HTMLInputElement>(props.placeholder);
        expect(inputElement.value).toBe(newValue);
    });
});
