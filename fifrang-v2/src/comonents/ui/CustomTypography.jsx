import styled from "styled-components";
import PropTypes from "prop-types";

const CstTypography = styled.div`
  font-size: ${(props) => props.fontSize || "30px"}; //텍스트 기본 사이즈
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;

function CustomTypography(props) {

  return (
    <CstTypography
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
      color={props.color}
    >
      {props.content}
    </CstTypography>
  );
}

CustomTypography.propTypes = {
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  color: PropTypes.string,
  content: PropTypes.string,
};

export default CustomTypography;
