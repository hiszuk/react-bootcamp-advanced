import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Avatar, Button, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { Logo } from "../../components/Logo";
import { SearchBar } from "./SearchBar";
import useStyles from "./style";
import { UserMenu } from "./UserMenu";

// 追加
import { useRecoilValue } from "recoil";
import { GlobalUser } from "../../stores/User";

export const DashboardHeader = () => {
  const styles = useStyles();

  // ユーザーメニューポップアップ追加
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleUsermenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUsermenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    navigate("/signout");
  };

  // ユーザー情報Atom
  const globalUser = useRecoilValue(GlobalUser);

  return (
    <AppBar elevation={0} color="inherit">
      <Toolbar className={styles.between}>
        <div className={styles.flex}>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Link to="/" className={styles.logo}>
            <Logo />
          </Link>
        </div>

        <SearchBar />

        <div className={styles.flex}>
          {/*
            ユーザーがログインしていれば、ユーザー用のデザインを表示
            未ログインであれば「ログインボタン」を表示
          */}
          {globalUser ? (
            <>
              <Link to="/upload">
                <IconButton>
                  <VideoCallIcon />
                </IconButton>
              </Link>
              <IconButton className={styles.profileIcon} onClick={handleUsermenuClick}>
              <Avatar src={globalUser.profile_photo_url||""} />
              </IconButton>
              <UserMenu name={globalUser.name} buttonRef={anchorEl} onClose={handleUsermenuClose} onLogout={handleLogout} />
            </>
          ) : (
            <Button variant="outlined" color="primary" href="/login">
              ログイン
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
