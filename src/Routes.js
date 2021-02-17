import { Route, Switch } from "react-router-dom";
import RepositoriesView from "./pages/RepositoriesView";
import CreateIssueView from "./pages/CreateIssueView";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Routes = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={RepositoriesView} />
        <Route exact path="/create-issue" component={CreateIssueView} />
      </Switch>
      <Footer />
    </>
  );
};

export default Routes;
