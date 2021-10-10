import { makeStyles } from "@material-ui/core";

export default makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  textPadding: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  avatarFigure: {
    width: 300,
    height: 300,
    borderRadius: "100%",
    margin: "auto",
  },
  full: {
    width: "100%",
  },
  button: {
    marginTop: "2rem",
  }
});
