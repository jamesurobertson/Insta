import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Layout1 from "./Layout1"
import Layout2 from "./Layout2"
import Layout3 from "./Layout3"

const ExploreGridWrapper = styled.div`
  margin: auto;
  margin-top: 10vh;
  margin-bottom: 10vh;
  width: 95vw;
  max-width: 963px; 
`;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


const ExploreGrid = (props) => {
    
    const [template, setTemplate] = useState([])
    const [photos, setPhotos] = useState([])

    useEffect(() => { 

        let photoArray = []

        for (let i = 0; i < 20; i++) {
            let picRandomInt = getRandomInt(1, 100)
            photoArray.push(`https://picsum.photos/id/${picRandomInt}/614/614`)    
        }

        setPhotos(photoArray)

        let templateArray = []
        let squares = photoArray.length

        while(squares >= 3) {
            const randomInt = getRandomInt(1, 4)

            if (templateArray[0] === randomInt){
                continue
            }

            templateArray.unshift(randomInt)
            squares -= 3
        }

        setTemplate(templateArray)
       
    }, [photos.length])

    const displayLayout = (layout, i) => {
        let count = 0;
        let componentPhotos

        if (i !== 0) {
            const templateSlice = template.slice(0, i)
            templateSlice.forEach(num => {
                count += 3
            })
        }

        switch (layout) {
            case 1:
                componentPhotos = photos.slice(count, (count + 3))
                return <Layout1 key={`layoutKey${i}`} componentPhotos={componentPhotos}/>
            case 2:
                 componentPhotos = photos.slice(count, count + 3);
                return <Layout2 key={`layoutKey${i}`} componentPhotos={componentPhotos} />
            default:
                 componentPhotos = photos.slice(count, count + 3);
                return <Layout3 key={`layoutKey${i}`} componentPhotos={componentPhotos}/> 

        }
    }
  

    
    return (
        <ExploreGridWrapper>
            {template.map((layout, i) => {
                return displayLayout(layout, i)
            })}
        </ExploreGridWrapper>
    );
};

export default ExploreGrid;