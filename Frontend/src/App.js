import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "./App.css";
import Graph from "./components/Graph";

const projec = () => {
  const authInstance = window.gapi.auth2.getAuthInstance();
  const user = authInstance.currentUser.get();
  const profile = user.getBasicProfile();
  const email = profile.getEmail();
  const imageUrl = profile.getImageUrl();

  return (
    <>
      <nav>
        <div>Articence Project</div>
        <img className="push" src={imageUrl} />
        <Dropdown>
          <Dropdown.Toggle as="a">{email}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={authInstance.signOut}>
              Sign out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </>
  );
};

class LoginPage extends React.Component {
  componentDidMount() {
    window.gapi.load("signin2", () => {
      window.gapi.signin2.render("login-button");
    });
  }

  render() {
    return (
      <div className="container">
        <div id="login-button">Sign in with Google</div>
      </div>
    );
  }
}

const LandingPage = () => {
  return (
    <div className="header">
      <div className="hea">
        <h1>Articence Project</h1>
      </div>
      <h3>
        <u>Action Items</u>
      </h3>
      <div className="bullet">
        <ul>
          <li>Created front end using React.js</li>
          <li>Added Google sign in to React.js</li>
          <li>Used Flask in the backend</li>
          <li>
            Converted the given .csv file to JSON at the backed using Pandas{" "}
          </li>
          <li>Used axios to get response from the backednd</li>
          <li>Used React charts to generate charts</li>
          <li>
            Craeted URI endpints based on the requested mark and added query
            params based on the chosen filter{" "}
          </li>
          <li>
            Thanks a lot for giving me this opportunity. Hope you like it.
          </li>
        </ul>
      </div>
      <Link className="link" to="/projec">
        <h4> Click here to proceed to the project </h4>
      </Link>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: null,
    };
  }

  initializeGoogleSignIn() {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id:
            "561416806406-2sfhln2qo58pa1sn3hitsu8jvsclp4qn.apps.googleusercontent.com",
        })
        .then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance();
          const isSignedIn = authInstance.isSignedIn.get();
          this.setState({ isSignedIn });

          authInstance.isSignedIn.listen((isSignedIn) => {
            this.setState({ isSignedIn });
          });
        });
    });
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.onload = () => this.initializeGoogleSignIn();
    document.body.appendChild(script);
  }

  ifUserSignedIn(Component) {
    if (this.state.isSignedIn === null) {
      return <h1>Checking sign in</h1>;
    }
    return this.state.isSignedIn ? <Graph /> : <LoginPage />;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/projec" render={() => this.ifUserSignedIn(projec)} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
