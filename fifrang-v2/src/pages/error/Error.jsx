import { Container, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";

const ErrorMsg = styled("p")({
    color: 'red',
    display: "flex",
    fontWeight: 'bolder',
    fontSize: '30px'
});

function Error () {
    const navigate = useNavigate();
    const location = useLocation();
    const errMessage = location.state?.errorMessage || 'An Error occurred! ';


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Backspace') {
                e.preventDefault();
                navigate(-1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return (() => {
            window.removeEventListener('keydown', handleKeyDown);
        });

    }, []);

    return (
        <Container
            sx={{
              mt: 3,
              mb: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>
                ERROR
            </Typography>
            <p>{errMessage}</p>
            <ErrorMsg>구단주명 검색에 실패하였습니다.</ErrorMsg>
        </Container>
    )
}

export default Error;