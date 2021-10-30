import React from "react";

import { Link } from "react-router-dom";

//styles
import { Wrapper, Content } from "./BreadCrumbs.styles";

type Props = {
    movieTitle: string,
}

const BreadCrumbs: React.FC<Props> = ({movieTitle}) => (
    <Wrapper>
        <Content>
            <Link to='/'>
                <span>Home</span>
            </Link>
            <span>|</span>
            <span>{movieTitle}</span>
        </Content>
    </Wrapper>
);

export default BreadCrumbs;