import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {
  toggleDark: () => void;
  darkMode: boolean;
}


function Router({toggleDark, darkMode}: IRouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/coinapp/:coinId">
          <Coin darkMode={darkMode}/>
        </Route>
        <Route path="/coinapp">
          <Coins toggleDark={toggleDark}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;