import { Typography } from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import styled from "styled-components";

function AppBar(props) {
    return (
        <MuiAppBar elevation={0} position="fixed" {...props} />
    );
}

const Toolbar = styled.div`
    display : flex;
    justify-content : center;
    background : #7fc7d9;
    height : 100px;
    align-items : center;
`;

function HeaderBar() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h3" component="h2">
            {"FIFA.GG"}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeaderBar;
