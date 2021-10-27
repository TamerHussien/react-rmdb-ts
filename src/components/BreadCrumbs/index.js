import React from "react";
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

//styles
import { Wrapper, Content } from "./BreadCrumbs.styles";

const BreadCrumbs = ({movieTitle}) => (
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

BreadCrumbs.propTypes = {
    movieTitle: PropTypes.string
}

export default BreadCrumbs;