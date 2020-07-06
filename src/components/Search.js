import React from "react";
import styled from "styled-components";

const SearchInput = styled.input`
border: 1px solid #DBDBDB;
outline: 0;
padding: 3px 10px;
height: 28px;
border-radius: 3px;
`

const Search = () => {

    return (
        <div>
            <SearchInput placeholder='Search'/>
        </div>
    )
}


export default Search
