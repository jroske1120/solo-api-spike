import React, { Component } from 'react';
import { connect } from 'react-redux';


class ImageSearch extends Component {

  state = {
    search: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('handleSubmit:', this.state.search);
    this.props.dispatch({type: "FETCH_IMAGE", payload: this.state.search})

  }

  handleChange = (event) => {
    console.log('in search field', event.target.value);
    this.setState({
      search: event.target.value
    })
  }

  addToFavorites = (event, imgSrc) => {
    event.preventDefault();
    console.log('in click with:', imgSrc);
    this.props.dispatch({type: "ADD_FAVORITE", payload: imgSrc})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} placeholder="Search"></input>
          <button type="submit">Search</button>
        </form>
         {this.props.reduxState.searchResultReducer.map((item, index)=>{
           return <div key={index}>
             <img src={item.images.downsized.url} alt={item.title}/>
             <button onClick={ (event) => this.addToFavorites(event, item.images.downsized) }>Add to Favorties</button>
             </div>
          })} 
      </div>
    );
  }
  
}
const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(ImageSearch);
