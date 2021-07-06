import React from 'react';
import styled from 'styled-components';
import UserSquare from './UserSquare';

const SearchGridWrapper = styled.div`
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10vh;
    width: 95vw;
    max-width: 614px;
    display: flex;
    flex-flow: wrap;
`;

const SearchGrid = ({ queryRes, query }) => {
    return (
        <SearchGridWrapper key='gridWrapper'>
            <div className='searchResult'>
                <h1>
                    {queryRes.length === 0
                        ? 'No Results Found'
                        : `Search Results for: ${query}`}
                </h1>
            </div>

            {queryRes.map((result) => {
                return (
                    <UserSquare
                        key={`userSquare-${result.id}`}
                        result={result}
                    />
                );
            })}
        </SearchGridWrapper>
    );
};

export default SearchGrid;
