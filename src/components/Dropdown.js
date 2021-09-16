import React from 'react'

const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => {
    return (
        <select id={id} 
                onChange={event => onSelectedValueChange(event.target.value)}>
            {options.map(({ value, label }) => (
                <option value={value} 
                        selected={value === selectedValue}>
                    {label}
                </option>
            ))}
        </select>
    );
}

export default Dropdown;
