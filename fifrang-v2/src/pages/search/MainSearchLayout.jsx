import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Container, Box } from "@mui/material";

function MainSearchLayout(props) {
  const { sxBackground, children } = props;
  const MainSearchLayoutRoot = styled("section")(({ theme }) => ({
    color: theme.palette.common.white,
    display: "flex",
    alignItems: "center",
    height: "100vh",
  }));

  const Background = styled("div")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: -2,
  });

  return (
    <MainSearchLayoutRoot>
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="./src/assets/soccerPlayer.svg"
          alt="wonder"
          width="400"
          height="200"
        />
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "common.black",
            opacity: 0.5,
            zIndex: -1,
          }}
        />
        <Background sx={sxBackground} />
        {children}
        <Box
          component="img"
          src="/static/themes/onepirate/productHeroArrowDown.png"
          height="16"
          width="12"
          alt="arrow down"
          sx={{ position: "absolute", bottom: 32 }}
        />
      </Container>
    </MainSearchLayoutRoot>
  );
}

MainSearchLayout.propTypes = {
  sxBackground: PropTypes.object,
  children: PropTypes.array,
};

export default MainSearchLayout;
