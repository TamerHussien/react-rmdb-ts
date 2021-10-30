import React from "react";
// styles

import { Wrapper, Image } from "./Actor.styles";

type Props = {
    actorName: string,
    character: string,
    imageUrl: string
}

const Actor: React.FC<Props>= ({actorName, character, imageUrl}) => (
    <Wrapper>
        <Image src={imageUrl} alt="actor-thumb"/>
        <h3>{actorName}</h3>
        <p>{character}</p>
    </Wrapper>
)

export default Actor;