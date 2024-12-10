import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import '../news.module.css';
import { connect } from 'react-redux';


const categoryColors = {
  general: '#F7D684',
  business: '#7FBCFE',
  entertainment: '#8D8D8D',
  health: '#9AC2C9',
  science: '#B2B2B2',
  sports: '#B3DEC1',
  technology: '#F49090',
};

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general',
    color: 'warning',
    searchQuery: '',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      showModal: false,
      fromDate: '',
      toDate: '',
      filterApplied: false,
    };
    document.title = `${this.capLetter(this.props.category)} - NewsPlus`;
    document.body.style.backgroundColor = categoryColors[this.props.category] || '#FFFFFF';
  }

  async componentDidMount() {
    this.fetchNews();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.country !== this.props.country ||
      prevProps.category !== this.props.category ||
      prevProps.searchQuery !== this.props.searchQuery ||
      prevState.fromDate !== this.state.fromDate ||
      prevState.toDate !== this.state.toDate ||
      prevState.filterApplied !== this.state.filterApplied
    ) {
      this.setState({ page: 1, articles: [] }, () => {
        this.fetchNews();
      });
    }
  }

  fetchNews = async () => {
    this.props.setProgress(10);
    let url;
    const { searchQuery, apiKey, pageSize, country, category } = this.props;
    const { fromDate, toDate, page, filterApplied } = this.state;

    if (filterApplied) {
      url = `https://newsapi.org/v2/everything?q=everything&from=${fromDate}&to=${toDate}&sortBy=popularity&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    } else if (searchQuery) {
      url = `https://newsapi.org/v2/everything?q=${searchQuery}&from=${fromDate}&to=${toDate}&sortBy=popularity&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&from=${fromDate}&to=${toDate}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    }

    this.props.setProgress(30);
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(70);
    let parseData = await data.json();
    // console.log("Fetched Articles: ", parseData.articles);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  fetchMoreData = async () => {
    let url;
    const { searchQuery, apiKey, pageSize, country, category } = this.props;
    const { fromDate, toDate, page, filterApplied } = this.state;

    if (filterApplied) {
      url = `https://newsapi.org/v2/everything?q=everything&from=${fromDate}&to=${toDate}&sortBy=popularity&apiKey=${apiKey}&page=${page + 1}&pageSize=${pageSize}`;
    } else if (searchQuery) {
      url = `https://newsapi.org/v2/everything?q=${searchQuery}&from=${fromDate}&to=${toDate}&sortBy=popularity&apiKey=${apiKey}&page=${page + 1}&pageSize=${pageSize}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&from=${fromDate}&to=${toDate}&apiKey=${apiKey}&page=${page + 1}&pageSize=${pageSize}`;
    }

    this.setState({ page: page + 1 });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
    });
  };

  handleFilterClick = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  applyFilter = (fromDate, toDate) => {
    this.setState({ fromDate, toDate, showModal: false, filterApplied: true }, () => {
      this.fetchNews();
    });
  };

  render() {
    const { isAuthenticated } = this.props;
    return (
      <>
        <div className="header">
          {isAuthenticated && (
            <button
              className="btn btn-dark"
              style={{ float: 'right', marginRight: '20px' }}
              onClick={this.handleFilterClick}
            >
              Filter By Date
            </button>
          )}
          <h2 className="text-center" style={{ marginTop: '100px' , fontWeight:'700'}}>
            {this.props.searchQuery
              ? `Search Results for "${this.props.searchQuery}"`
              : `NewsPlus - Top ${this.capLetter(this.props.category)} Headlines`}
          </h2>
        </div>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.articles.length > 0 && <Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                if (!element || !element.title) {
                  return null;
                }
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title || 'No title'}
                      description={element.description || 'No Description'}
                      imageUrl={element.urlToImage}
                      author={element.author}
                      date={element.publishedAt}
                      color={this.props.color}
                      source={element.source.name}
                      newsUrl={element.url}
                      category={this.props.category}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Filter By Date</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="fromDate">
                <Form.Label>From Date</Form.Label>
                <Form.Control
                  type="date"
                  value={this.state.fromDate}
                  onChange={(e) => this.setState({ fromDate: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="toDate">
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  value={this.state.toDate}
                  onChange={(e) => this.setState({ toDate: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => this.applyFilter(this.state.fromDate, this.state.toDate)}
            >
              Apply Filter
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

News.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(News);
