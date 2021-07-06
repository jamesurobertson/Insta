
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
const NoFollowsWrapper = styled.div`
margin-top: 20px;
display: flex;
padding: 0 20px;
justify-content: center;
align-items: center;
text-align: center;
flex-flow: column;
height: 300px;
width: 100%;
`
const ExploreButton = styled.button`
margin-top: 20px;
    background-color: #0095f6;
    font-weight: bold;
    color: white;
    border: none;
    width: 80%;
    border-radius: 5px;
    height: 30px;
`
const NoFollows = (props) => {

    return (
        <NoFollowsWrapper>
            <p>Looks like you're not following anyone.</p>
            <p>Explore to find more!</p>
            <ExploreButton onClick={() => props.history.push('/explore')}>
                Explore
            </ExploreButton>
        </NoFollowsWrapper>
    )
}


export default withRouter(NoFollows)
