import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px #333333",
    display: "flex",
    alignItems: "center",
    margin: "1em",
    padding: ".5em",
    width: (props) => props.width,
  },
  col2: {
    paddingLeft: ".5em",
  },
});

const Card = (props) => {
  const classes = useStyles(props);

  return (
    <div
      className={classes.card}
      key={props.data.id}
      onClick={() => props.handleClick()}
    >
      {props.children}
      <div className={classes.col2}>
        <p>{props.data.title}</p>
        <p className={classes.body}>{props.data.body}</p>
      </div>
    </div>
  );
};

export default Card;
