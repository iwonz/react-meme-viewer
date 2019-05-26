import React, { Component } from 'react';

import './style.css';

import Meme from '../Meme';

export default class MemeList extends Component {
  state = {
    activeMemeId: 1,
    defaultLikedMemeId: 2
  };

  render() {
    const {activeMemeId, defaultLikedMemeId} = this.state;

    const memes = this.props.memes.map((meme) => {
      return <Meme meme={meme}
                   isLiked={meme.id === defaultLikedMemeId}
                   isDetailsVisible={meme.id === activeMemeId}
                   onOpenDetailsClick={this.toggleActiveMeme.bind(this, meme.id)}
                   key={meme.id}/>;
    });

    return (
      <div className="meme-list">
        {memes}
      </div>
    );
  }

  toggleActiveMeme = (memeId) => this.setState({
    activeMemeId: this.state.activeMemeId === memeId ? null : memeId
  });
};
