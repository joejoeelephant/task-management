import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputSelect from './InputSelect'; // Adjust the import path as necessary



describe('InputSelect', () => {
    
    const options = [
        { id: '1', value: 'Option 1' },
        { id: '2', value: 'Option 2' },
    ];
    const mockOnChange = jest.fn();

    it('initializes with the first option if no initValue is provided', () => {
        render(<InputSelect options={options} onChange={mockOnChange} />);

        expect(screen.getAllByText('Option 1')[0]).toBeInTheDocument();
    });

    it('initializes with the initValue when provided', () => {
        render(<InputSelect options={options} onChange={mockOnChange} initValue="2" />);

        expect(screen.getAllByText('Option 2')[0]).toBeInTheDocument();
    });

    it('toggles options display on click', () => {
        render(<InputSelect options={options} onChange={mockOnChange} />);
        const selectBox = screen.getAllByText('Option 1')[0];

        // First click to show options
        fireEvent.click(selectBox);
        expect(screen.getByTestId('options-wrapper')).not.toHaveClass('hidden');

        // Second click to hide options
        fireEvent.click(selectBox);
        // This assertion depends on how your CSS "hidden" class works. You may need to adjust.
        expect(screen.getByTestId('options-wrapper')).toHaveClass('hidden');;
    });

    it('changes the current option when a new option is selected', () => {
        render(<InputSelect options={options} onChange={mockOnChange} />);
        
        // Show options
        fireEvent.click(screen.getByTestId('current-option'));
        
        // Select the second option
        fireEvent.click(screen.getAllByText('Option 2')[0]);

        // Expect the onChange to have been called with the second option
        expect(mockOnChange).toHaveBeenCalledWith(options[1]);
        // The selected option updates to 'Option 2'
        expect(screen.getByTestId('current-option')).toHaveTextContent('Option 2')
    });
});
