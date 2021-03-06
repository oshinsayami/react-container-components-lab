import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'dGpQ5OmGP2SgfvZimlpCUoF4iOag9qzZ';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}&query=`;

// Code SearchableMovieReviewsContainer Here
export default class SearchableMovieReviewsContainer extends Component{
    state = {
        searchTerm: '',
        reviews: []
    }

    render() {
        return (
            <div className="searchable-movie-reviews">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="search-input">Search Movie Reviews</label>
                    <input id="search-input" type="text" style={{ width: 300 }} onChange={this.handleSearch} />
                    <button type="submit">Submit</button>
                </form>
                {typeof this.state.reviews === 'onbject' && this.state.reviews.length > 0 && <h2>Movie Review by search:</h2>}
                <MovieReviews reviews={this.state.reviews} />
            </div>
        )
    }

    handleSearch = e =>
        this.setState({
            searchTerm: e.target.value
        })
    
    handleSubmit = e => {
        e.preventDefault()
        fetch(URL.concat(this.state.searchTerm))
            .then(res => res.json)
            .then(res=>this.setState({reviews:res.results}))
    }
}