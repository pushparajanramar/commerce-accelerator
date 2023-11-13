import React from 'react';
import SuggestionListItem from './SuggestionListItem';

function SuggestionList({ list, query }) {

    return (
        <ul>
            {list?.slice(0, 8).map((item, key) => {
                return <SuggestionListItem item={item} query={query} key={'slist' + key} />
            })}

        </ul>
    );
}

export default SuggestionList;