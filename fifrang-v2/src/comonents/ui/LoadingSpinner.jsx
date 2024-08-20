import styled from "styled-components";
import PropTypes from "prop-types";

// TODO : loading Spinner 위치 조정이 필요해보임
const LoadingSpinner = styled.div`
  border: 10px solid #f3f3f3;
  border-top: 10px solid #3498db;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;
  top: 50%;
  left: 50%;
  position: absolute;

  @keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 1000px;
  font-size: 24px;
  color: #333;
`;

function Loading(props) {
    const { message } = props;

    return (
        <>
            <LoadingSpinner>
            </LoadingSpinner>
            <LoadingMessage>{message}</LoadingMessage>
        </>
    )
}

Loading.propTypes = {
    message: PropTypes.string,
}

export default Loading;