import React from "react";
import "./App.css";
import SearchFilter from "./components/SearchBar";

class App extends React.Component {
  state = {
    loading: true,
    shownUsers: [],
    filteredUsers: [],
  };
  async componentDidMount() {
    await this.fetchSampleUsers();
  }
  fetchSampleUsers = async () => {
    const url = "https://randomuser.me/api/?seed=mesph&results=5&exc=login";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      users: data.results,
      shownUsers: data.results,
      filteredUsers: data.results,
      loading: false,
    });
  };
  showAll = () => {
    this.setState({
      shownUsers: this.state.users,
      filteredUsers: this.state.users,
    });
  };
  showMale = () => {
    let male = this.state.users.filter((item) => {
      return item.gender === "male";
    });
    this.setState({ shownUsers: male, filteredUsers: male });
  };
  showFemale = () => {
    let male = this.state.users.filter((item) => {
      return item.gender === "female";
    });
    this.setState({ shownUsers: male, filteredUsers: male });
  };
  handleChange = (e) => {
    // console.log(e);
    let data = this.state.shownUsers.filter((x) => {
      if (e.type === "Name")
        return (
          (x.name.first + " " + x.name.last).toLowerCase().indexOf(e.value) > -1
        );
      else return x.nat.toLowerCase().indexOf(e.value) > -1;
    });
    this.setState({ filteredUsers: data });
  };
  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="column">
            <div className="intro-paragraph">
              <h1>
                <span>Hello,</span> Benard
              </h1>
              <h6>
                Welcome to your dashboard, kindly sort through the user base
              </h6>
            </div>

            <input className="input" type="text" placeholder="" />
            <div>
              <h5>Show Users</h5>
            </div>
            <div className="flex-container">
              <div>
                <button className="btn users" onClick={this.showAll}>
                  {" "}
                  <i
                    className="fa fa-users"
                    style={{ fontSize: "60px" }}
                  ></i>{" "}
                </button>
                <h6> All Users</h6>
              </div>
              <div>
                <button className="btn male" onClick={this.showMale}>
                  {" "}
                  <i className="fa fa-male" style={{ fontSize: "60px" }}></i>
                </button>
                <h6>Male Users</h6>
              </div>
              <div>
                <button className="btn female" onClick={this.showFemale}>
                  {" "}
                  <i className="fa fa-female" style={{ fontSize: "60px" }}></i>
                </button>
                <h6>Female Users</h6>
              </div>
            </div>
          </div>
          <div className="column result-col">
            <div>
              {this.state.loading || !this.state.filteredUsers ? (
                <div>loading...</div>
              ) : (
                <div>
                  <div className="search-container">
                    <SearchFilter onChange={this.handleChange} />
                  </div>
                  {this.state.filteredUsers.map((person) => {
                    return (
                      <div className="result-details">
                        <div
                          class="card mb-3"
                          style={{
                            height: "10rem",
                            paddingLeft: "5rem",
                            borders: "2",
                          }}
                        >
                          <div class="row no-gutters">
                            <div class="col-md-4">
                              <img
                                src={person.picture.thumbnail}
                                alt="profile"
                              />
                            </div>
                            <div class="col-md-8">
                              <div class="card-body">
                                {person.name.first} {person.name.last}
                                <p>
                                  <small className="text-muted">
                                    {person.location.street.number}{" "}
                                    {person.location.street.name}
                                  </small>
                                </p>
                                <p>
                                  <small className="text-muted">
                                    {person.email}{" "}
                                    <i className="fa fa-phone"></i>
                                    {person.phone}
                                  </small>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
