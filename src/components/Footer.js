import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles({
  footerContainer: {
    display: "flex",
    height: "75px",
    margin: 0,
    boxSizing: "border-box",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },
  linksContainer: {
    display: "flex",
  },
  link: {
    marginLeft: ".5em",
  },
  companyName: {
    color: ({ theme }) => theme.colorPrimary,
  },
});

const Footer = (props) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });
  return (
    <div className={classes.footerContainer}>
      <p>
        Need Help? <a href="mailto:support@astrumu.com">Contact Us</a>
      </p>
      <h2 className={classes.companyName}>Astrum U</h2>
      <div className={classes.linksContainer}>
        <a href="https://www.astrumu.com/">Terms of Service</a>
        <a className={classes.link} href="https://www.astrumu.com/">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default Footer;
