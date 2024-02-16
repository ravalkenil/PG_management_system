import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./Layouts/Layout";
import RegisterPage from "./Pages/Register";
import SignIn from "./Pages/SignIn";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <p>Home Page</p>
              </Layout>
            }
          />
          <Route
            path="/search"
            element={
              <Layout>
                <p>Search page</p>
              </Layout>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Layout>
                  <SignIn/>
              </Layout>
            }
          />
          <Route path="/register" element={ <Layout><RegisterPage /> </Layout>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
