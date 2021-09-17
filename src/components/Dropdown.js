import React from 'react'

const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => {
    return (
        <select id={id} 
                onChange={event => onSelectedValueChange(event.target.value)}
                defaultValue={selectedValue}>
            {options.map(({ value, label }) => (
                <option value={value} key={value}
                        // selected={value === selectedValue}
                >
                    {label}
                </option>
            ))}
        </select>
    );
}

export default Dropdown;
