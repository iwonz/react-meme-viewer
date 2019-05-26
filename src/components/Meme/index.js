import React, { PureComponent } from 'react';

import './style.css';

export default class Meme extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      likes: props.isLiked ? 1 : 0
    }
  }
  
  render() {
    const {meme, isDetailsVisible, onOpenDetailsClick} = this.props;

    const details = isDetailsVisible
      ? <span>{meme.date} by {meme.author}</span>
      : '';

    return (
      <div className="meme">
        <a href={meme.permalink} target="_blank">
          <img src={meme.image} alt={meme.title}/>
        </a>

        <div className="meme__content">
          <a href={meme.permalink} target="_blank">{meme.title}</a>
          <br/>
          <button className="meme__details-btn"
                  onClick={onOpenDetailsClick}>{isDetailsVisible ? 'Hide' : 'Show'} details
          </button>
          <br/>
          {details}
          <br/>
          <button className="meme__like"
                  onClick={this.addLike}>Like {this.state.likes ? this.state.likes + ' ♥' : ''}</button>
        </div>
      </div>
    );
  }

  addLike = () => {
    this.setState({
      likes: this.state.likes + 1
    });
  };
};
