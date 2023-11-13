import React from 'react';
import PropType from "prop-types"
function FilterCheckbox({ label, options, selectedValues, handleChangeOption }) {
    const labelId = label.replace(/ /g, "_")
    return (
        <ul>
            {options.map((item, index) => {
                return <li key={'link-checkbox' + labelId + index} className="category">
                    <form className="form-list">
                        <input id={'link-checkbox' + labelId + index} type="checkbox" value={item.name} className="tm-checkbox"
                            checked={selectedValues.indexOf(item.name) !== -1 ? true : false}
                            onChange={(e) => handleChangeOption(e, item)} />

                        <label className='p-sm' htmlFor={'link-checkbox' + labelId + index}>
                            {item.name}
                        </label>
                    </form>
                </li>
            })}
        </ul>
    );
}


FilterCheckbox.propTypes = {
    label: PropType.string,
    selectedValues: PropType.array,
    options: PropType.arrayOf(PropType.shape({
        id: PropType.string,
        name: PropType.string,
        code: PropType.string,
        stock: PropType.shape({
            stockLevelStatus: PropType.string
        }),
    })),
    handleChangeOption: PropType.func,
}


export default FilterCheckbox;