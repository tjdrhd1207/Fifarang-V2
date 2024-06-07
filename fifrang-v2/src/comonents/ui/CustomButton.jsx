
import PropTypes from 'prop-types'
import styled from 'styled-components';

const CstButton = styled.button`
    width: 200px;
    height: 50px;
    background-color: #4CAF50; /* Green background */
    color: white; /* White text */
    border: none; /* Remove borders */
    border-radius: 5px; /* Rounded corners */
    cursor: pointer; /* Pointer/hand icon on hover */
    font-size: 16px; /* Increase font size */
    margin: 10px;

    &:hover {
        background-color: #45a049; /* Darker green on hover */
    }
`;


function CustomButton(props) {
    const { name } = props;
    const onclick = () => {
        console.log("kk");
    }
    return (
        <CstButton onClick={onclick}>{name}</CstButton>
    )
}

CustomButton.propTypes = {
    name : PropTypes.string,
};

export default CustomButton;