import React from "react";
import PropTypes from 'prop-types';

import { Wrapper } from "./ShowMoreButton.styles";



const ShowMoreButton = ({text, callback}) => (
    <Wrapper type="button" onClick={callback}>
        {text}
    </Wrapper>
)
ShowMoreButton.propTypes = {
    text: PropTypes.string,
    callback: PropTypes.func
}
export default ShowMoreButton;