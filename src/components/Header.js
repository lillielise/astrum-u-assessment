import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles({
  headerContainer: {
    display: "flex",
    height: "75px",
    margin: 0,
    boxSizing: "border-box",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },
  userContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userIcon: {
    backgroundColor: "#d3d3d3",
    borderRadius: "5px",
    marginLeft: "5px",
    padding: "5px",
  },
  companyName: {
    color: ({ theme }) => theme.colorPrimary,
  },
});

const Header = (props) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });
  return (
    <div className={classes.headerContainer}>
      <h2 className={classes.companyName}>AstrumU</h2>
      <h1>{props.title}</h1>
      <div className={classes.userContainer}>
        <p>John Smith</p>
        <p className={classes.userIcon}>A</p>
      </div>
    </div>
  );
};

export default Header;
