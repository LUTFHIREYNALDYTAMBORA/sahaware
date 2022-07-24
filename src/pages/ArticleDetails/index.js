import React, { Component } from 'react';
import axios from 'axios';
import { ENV } from '../../configs';

// saya sudah cek beberapa id dari hasi GET dari API /api/article-category, tetapi data tidak sesuai dengan UI

class ArticleDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detailsArticle: {}
    }
  }

  componentDidMount() {
    const url = `${ENV.base_url}/api/article-category`;
    axios.get(url)
      .then(res => {
        console.log(res);
      })
  }

  render() {
    return (
      <div>
        ArticleDetails
      </div>
    );
  }
}

export default ArticleDetails;