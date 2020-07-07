import React from "react";
import styled from "styled-components";
import {IoMdSearch} from "react-icons/io"

const SearchInput = styled.input`
border: 1px solid #DBDBDB;
outline: 0;
padding: 3px 10px;
height: 28px;
border-radius: 3px;

.searchIcon {
    
}
`

const Search = () => {

    return (
        <div>
            <SearchInput placeholder='Search'/>
            <IoMdSearch className='searchIcon'/>
        </div>
    )
}


export default Search
