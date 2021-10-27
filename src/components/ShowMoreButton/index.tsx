import React from "react";

import { Wrapper } from "./ShowMoreButton.styles";

type Props = {
    text: string,
    callback: () => void;
}

const ShowMoreButton: React.FC<Props> = ({text, callback}) => (
    <Wrapper type="button" onClick={callback}>
        {text}
    </Wrapper>
)

export default ShowMoreButton;