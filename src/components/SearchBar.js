
import React, { Component } from 'react'

class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFilter: "",
      filterType: "Country",
    };
  }

  handleChange = (e) => {
    this.setState({
      userFilter: e.target.value,
    });
    this.props.onChange({value: e.target.value.toLowerCase(), type: this.state.filterType});
  };
  optionSelected = (e) =>{
    this.setState({filterType: e.target.value});
    this.props.onChange({value: this.state.userFilter.toLowerCase(), type: e.target.value});
  }
  render() {
    return (
        <div>
          <input
            type="text"
            id="filter"
            placeholder="Find in list"
            value={this.state.userFilter}
            onChange={this.handleChange}
          />
          <select className="select" onChange={this.optionSelected}>
            <option>Country</option>
            <option>Name</option>
          </select>
        
          </div>
          
    );
  }
}

export default SearchFilter;
