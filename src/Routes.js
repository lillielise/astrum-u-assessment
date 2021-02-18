import { Route, Switch } from "react-router-dom";
import RepositoriesView from "./pages/HomeView";
import CreateIssueView from "./pages/CreateIssueView";
import Footer from "./components/Footer";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={RepositoriesView} />
        <Route exact path="/create-issue" component={CreateIssueView} />
      </Switch>
      <Footer />
    </>
  );
};

export default Routes;
