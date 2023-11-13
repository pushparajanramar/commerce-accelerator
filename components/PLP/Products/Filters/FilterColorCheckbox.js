import React, { Fragment } from 'react';
import configuration from '../../../../constants/configuration';

function FilterColorCheckbox({ label, options, selectedValues, handleChangeOption }) {
    const labelId = label.replace(/ /g, "_")
    return (
        <ul className="color-check-box">
            {options.map((item, index) => {
                const hasMedia = item?.media ? true : false;
                const value = hasMedia ? item.code : item.name;
                let styleObject = { backgroundColor: "", background: "" }
                if (hasMedia) {
                    styleObject = {
                        background: `url(${item?.media?.url})`
                    }
                } else {
                    styleObject = {
                        backgroundColor: item.name
                    }
                }

                return <Fragment key={'link-checkbox' + labelId + index}>
                    {(item.stock && item.stock.stockLevelStatus === configuration.outOfStockStatus) ?
                        <li key={'link-checkbox' + labelId + index} className={`items-list ${selectedValues.indexOf(value) !== -1 ? 'border-slate-700' : ''}`}>
                            <div className={`color-checkbox outoff-stock`} style={styleObject} checked={selectedValues.indexOf(item.name) !== -1 ? true : false} onClick={(e) => handleChangeOption(e, item)}>
                            </div>
                        </li>
                        :
                        <li key={'link-checkbox' + labelId + index} className={`items-list ${selectedValues.indexOf(value) !== -1 ? 'border-slate-700' : ''}`} onClick={(e) => handleChangeOption(e, item)}>
                            <div className={`color-checkbox in-stock`} style={styleObject} checked={selectedValues.indexOf(item.name) !== -1 ? true : false} onClick={(e) => handleChangeOption(e, item)}>
                            </div>
                        </li>
                    }
                </Fragment>
            })}
        </ul >
    );
}

export default FilterColorCheckbox;