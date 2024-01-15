import React from "react";
import { Container, useMediaQuery, useTheme } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { useContext } from "react";
import { IconBlack, LogoBlack } from "../../../core/constants/image-locator";
import { AuthContext } from "../../../store/auth";
import NavBarMenuXsCmp from "./components/menu-xs";
import NavBarMenuCmp from "./components/menu";
import { useHistory } from "react-router-dom";
import Routes from "../../routes/routes";

const NavBarCmp = (props) => {
  const history = useHistory();
  const theme = useTheme();
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  return (
    <Box
      boxShadow={theme.shadows[2]}
      height={48}
      display="flex"
      alignItems="center"
      position="sticky"
      top={0}
      zIndex={theme.zIndex.appBar}
      bgcolor={"#FFF"}
    >
      <Container>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Box
              height={{ xs: 32, sm: 16 }}
              className="cursor-pointer"
              onClick={() => history.push(Routes.home.path)}
            >
              <img src={isXs ? IconBlack : LogoBlack} alt="sert nation logo" />
            </Box>
          </Box>
          {isXs ? <NavBarMenuXsCmp /> : <NavBarMenuCmp />}
        </Box>
      </Container>
    </Box>
  );
};

export default NavBarCmp;
