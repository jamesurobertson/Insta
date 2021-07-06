import { useState } from 'react';
import styled from 'styled-components';

import ExploreGrid from './ExploreGrid';
import SearchGrid from './SearchGrid';

const ExploreWrapper = styled.div`
    margin-top: 54px;
    padding-top: 10px;

    .searchBox,
    .searchResult {
        margin: auto;
        margin-bottom: 10px;
        width: 95vw;
        max-width: 614px;
    }

    input {
        padding: 4px 8px;
        border: 1px solid #dfdfdf;
        border-radius: 3px;
        width: 200px;
    }

    @media screen and (max-width: 614px) {
        .searchBox {
            display: flex;
            justify-content: center;
        }
    }
`;

const Explore = () => {
    const [query, setQuery] = useState('');
    const [queryRes, setQueryRes] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (e.target.value === '') {
            setQuery(e.target.value);
            setQueryRes([]);
            return;
        }
        setQuery(e.target.value);
        const queryLower = encodeURIComponent(e.target.value.toLowerCase());

        try {
            const res = await fetch(`/api/search?query=${queryLower}`);

            const { results } = await res.json();

            setQueryRes(results);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <ExploreWrapper>
            <div className={'searchBox'}>
                <input
                    name='search'
                    placeholder='Search'
                    onChange={handleSubmit}
                ></input>
            </div>

            {!query ? (
                <ExploreGrid />
            ) : (
                <SearchGrid queryRes={queryRes} query={query} />
            )}
        </ExploreWrapper>
    );
};

export default Explore;
