import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faList } from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  header: {
    fontWeight: "bold",
    margin: 0,
    paddingTop: "5px",
  },
  icon: {
    marginRight: "5px",
  },
});

const UserOverview = (props) => {
  const classes = useStyles();
  return (
    <div>
      <p
        className={classes.header}
      >{`${props.user.name} (@${props.user.email})`}</p>
      <p>
        <FontAwesomeIcon className={classes.icon} icon={faEnvelope} />{" "}
        {props.user.email}
      </p>
      <p>
        <FontAwesomeIcon className={classes.icon} icon={faList} />
        {`${props.user.repositories.totalCount} ${
          props.user.repositories.nodes.length === 1
            ? "respository"
            : "repositories"
        }`}
      </p>
    </div>
  );
};

export default UserOverview;
