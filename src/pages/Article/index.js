import React, { Component } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import './style.css';
import { ENV } from '../../configs';

class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listArticle: [],
      isLoading: true
    }
  }

  componentDidMount() {
    const url = `${ENV.base_url}/api/article?size=9&page=1`;
    axios.get(url)
      .then(res => {
        this.setState({
          listArticle: res?.data?.content,
          isLoading: false
        })
      })
  }

  render() {
    const { listArticle, isLoading } = this.state;
    return (
      <React.Fragment>
        {isLoading ?
          <Box>
            <Skeleton variant="text" width={'100%'} height={115} />
            <Skeleton variant="text" width={'100%'} height={115} />
            <Skeleton variant="text" width={'100%'} height={115} />
            <Skeleton variant="text" width={'100%'} height={115} />
          </Box> :
          <div className="grid-container">
            {listArticle.map((val, idx) => {
              return (
                <div className='item-article' >
                  <img alt='' src={val?.image} />
                  <h2>{val?.title}</h2>
                  <p>{val?.short_description}</p>
                </div>
              );
            })}
          </div>
        }
      </React.Fragment>
    );
  }
}

export default Article;