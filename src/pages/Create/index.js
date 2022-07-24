import React, { Component } from 'react';
import './style.css';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';
import { ENV } from '../../configs';

class Create extends Component {
  state = {
    createArticle: {
      title: '',
      short_description: '',
      category: '', // cek di postman tidak ada category, adanya category_id
      description: '',
      is_visible: true,
      image: ''
    }
  }

  _handleChangeFile = (e) => {
    let imgName = e.target.files[0].name;
    this.setState({
      createArticle: {
        ...this.state.createArticle,
        image: imgName
      }
    });
  }

  _handleCreateArticle = () => {
    const { createArticle } = this.state;
    const url = `${ENV.base_url}/api/article/create`;
    axios.post(url, createArticle)
      .then(function (response) {
        console.log(response);
        // response success = true, tapi error 403 dengan message Invalid Token
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  _renderFieldTitle = () => {
    const { createArticle } = this.state;
    return (
      <React.Fragment>
        <p>Title</p>
        <input
          className="field-title"
          onChange={(e) => {
            this.setState({
              createArticle: {
                ...createArticle, title: e.target.value
              }
            })
          }}
          placeholder="Enter your Article Title"
          value={createArticle?.title}
        />
      </React.Fragment>
    );
  }

  _renderTextareaDesc = () => {
    const { createArticle } = this.state;
    return (
      <textarea
        className="textarea-story"
        onChange={(e) => {
          this.setState({
            createArticle: {
              ...createArticle, description: e.target.value
            }
          })
        }}
        placeholder="Write your Story"
        value={createArticle?.description}
      />
    );
  }

  _renderFieldShortDesc = () => {
    const { createArticle } = this.state;
    return (
      <React.Fragment>
        <p>Short description</p>
        <textarea
          className="textarea-desc"
          onChange={(e) => {
            this.setState({
              createArticle: {
                ...createArticle, short_description: e.target.value
              }
            })
          }}
          placeholder="Enter your Article Short Description"
          value={createArticle?.short_description}
        />
      </React.Fragment>
    );
  }

  _renderUploadFile = () => {
    return (
      <React.Fragment>
        <p>Thumbnail</p>
        <input
          accept="image/png, image/jpeg"
          className="field-thumbnail"
          id="thumbnail"
          name="thumbnail"
          onChangeCapture={this._handleChangeFile}
          type="file"
        />
      </React.Fragment>
    );
  }

  _renderSelectCategory = () => {
    const { createArticle } = this.state;
    return (
      <React.Fragment>
        <p>Categories</p>
        <div className="container-select">
          <select
            onChange={(e) => {
              this.setState({
                createArticle: {
                  ...createArticle, category: e.target.value
                }
              })
            }}
            defaultValue="Select Category"
          >
            <option disabled>Select Category</option>
            <option value="Sport">Sport</option>
            <option value="Politic">Politic</option>
            <option value="Religi">Religi</option>
            <option value="Fashion">Fashion</option>
          </select>
          <ArrowDropUpIcon className='icon-arrow-up' />
          <ArrowDropDownIcon className='icon-arrow-down' />
        </div>
      </React.Fragment>
    );
  }

  _renderSwitchPublish = () => {
    const { createArticle } = this.state;
    return (
      <div className="container-switch">
        <div>Published</div>
        <Switch
          defaultChecked
          onChange={(e) => {
            this.setState({
              createArticle: {
                ...createArticle, is_visible: e.target.checked
              }
            })
          }}
          value={createArticle?.is_visible}
        />
      </div>
    );
  }

  _renderActionPublish = () => {
    return (
      <Button
        className='btn-publish'
        color='error'
        onClick={this._handleCreateArticle}
        variant="contained"
      >
        Publish
      </Button>
    );
  }

  render() {
    return (
      <div className="container-create">
        <div className="side-left">
          <h2>Create a New Article</h2>
          {this._renderFieldTitle()}
          {this._renderTextareaDesc()}
        </div>
        <div className="side-right">
          <h2>Publication Detail</h2>
          {this._renderFieldShortDesc()}
          {this._renderUploadFile()}
          {this._renderSelectCategory()}
          {this._renderSwitchPublish()}
          {this._renderActionPublish()}
        </div>
      </div >
    );
  }
}

export default Create;