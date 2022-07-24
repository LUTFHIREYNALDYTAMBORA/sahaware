import React, { Component } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import './style.css';
import { ENV } from '../../configs';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      isLoading: true
    }
  }

  componentDidMount() {
    const url = `${ENV.base_url}/api/article?size=3&page=1`;
    axios.get(url)
      .then(res => {
        this.setState({
          articles: res?.data?.content,
          isLoading: false
        })
      })
  }
  render() {
    const { articles, isLoading } = this.state;
    return (
      <div>
        <div className='wrapp-img-woman' />
        <div className='title'>Article</div>
        {isLoading ?
          <Box>
            <Skeleton variant="text" width={'100%'} height={115} />
          </Box> :
          <div className="grid-container">
            {articles.map((val, idx) => {
              return (
                <div className='item-article' >
                  <img
                    alt=''
                    src={val?.image}
                  // image tidak dapat diakses
                  />
                  <h2>{val?.title}</h2>
                  <p>{val?.short_description}</p>
                </div>
              );
            })}
          </div>
        }
      </div>
    );
  }
}

export default Home;
