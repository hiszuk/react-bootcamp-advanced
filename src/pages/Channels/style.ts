import { makeStyles } from "@material-ui/core";

export default makeStyles({
  // 要素の横幅の最大値を調整
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
  },
  cardHeader: {
    width: 240,
  },
  unsubButton: {
    marginTop: 10,
    marginLeft: 10,
  },
});
