import React, { useState } from "react";
import styled, { css } from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { useTheme, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import clsx from "clsx";

interface MenuItem {
  name: string;
  path: string;
  icon: JSX.Element;
  adminOnly: boolean;
}

const menu: MenuItem[] = [
  {
    name: "hoge",
    path: "/",
    icon: <MenuIcon />,
    adminOnly: false
  }
];

const DRAWER_WIDTH = 240;

const useStyle = makeStyles((theme: Theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    height: "100vh",
    color: "white",
    whiteSpace: "nowrap",
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  }
}));

const Header: React.FC = props => {
  const [isOpenDrawer, setIsDrawer] = useState<boolean>(true);
  const theme = useTheme();
  const classes = useStyle();

  return (
    <>
      <HeaderBar
        position="absolute"
        color="default"
        theme={theme}
        isDrawer={isOpenDrawer}
      >
        <Tools>
          {!isOpenDrawer && (
            <IconButton onClick={() => setIsDrawer(true)}>
              <MenuButton />
            </IconButton>
          )}
        </Tools>
      </HeaderBar>
      <Drawer
        variant="permanent"
        open={isOpenDrawer}
        onClose={() => setIsDrawer(false)}
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !isOpenDrawer && classes.drawerPaperClose
          )
        }}
      >
        <CloseMenuWrapper className={classes.toolbarIcon}>
          <IconButton onClick={() => setIsDrawer(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </CloseMenuWrapper>
        <Divider />
        <List>
          {menu.map((item, key) => (
            <ListItem key={key} button={true}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </>
  );
};

export default Header;

const CloseMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
`;

const HeaderBar = styled(AppBar)`
  ${(props: { theme: Theme; isDrawer: boolean }) =>
    props.isDrawer &&
    css`
      margin-left: ${DRAWER_WIDTH}px;
      width: calc(100% - ${DRAWER_WIDTH}px);
    `}

  ${(props: { theme: Theme; isDrawer: boolean }) => css`
    z-index: ${props.theme.zIndex.drawer + 1};
    background: ${props.theme.palette.grey[200]};
    box-shadow: none;
    transition: ${props.theme.transitions.create(["width", "margin"], {
      easing: props.theme.transitions.easing.sharp,
      duration: props.theme.transitions.duration.leavingScreen
    })};
  `}
`;

const Tools = styled(ToolBar)`
  padding-right: 24px;
`;

const MenuButton = styled(MenuIcon)`
  margin-right: 36;
`;
