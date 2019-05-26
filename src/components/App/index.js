import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import './style.css';

import MemeList from '../MemeList';

const MEMES_PER_LOAD = 2;

export default class App extends Component {
  state = {
    memeCount: 0,
    offset: 0,
    memes: [],
    reversed: false
  };

  memeList = React.createRef();

  componentWillMount() {
    fetch('https://api.memeload.us/v1/stats')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          memeCount: data.meme_count
        });

        this.loadMemes();
      });
  }

  componentDidMount() {
    this.onScrollHandle = this.onScroll.bind(this);

    window.addEventListener('scroll', this.onScrollHandle);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollHandle);
  }

  render() {
    return (
      <div className="meme-finder">
        <h1>MemeViewer (thx <a href="https://memeload.us" target="_blank">memeload.us</a>)</h1>
        <button onClick={ this.revertMemes }>Reverse</button>
        <MemeList ref={ this.memeList } memes={ this.state.memes } />
      </div>
    );
  }

  /**
   * Bad code, can't find how to get memes with offset and limit in memeload.us
   */
  loadMemes() {
    if (this.state.isLoading) { return; }

    this.setState({
      isLoading: true
    });

    let newOffset = this.state.offset + MEMES_PER_LOAD;

    newOffset = newOffset > this.state.memeCount ? this.state.memeCount : newOffset;

    const promises = [];

    for (let i = this.state.offset + 1; i <= newOffset; i++) {
      promises.push(
        fetch(`https://api.memeload.us/v1/get?id=${i}`).then((response) => response.json())
      );
    }

    Promise.all(promises)
      .then((memes) => {
        this.setState({
          isLoading: false,
          offset: newOffset,
          memes: [...this.state.memes, ...memes]
        });

        this.onScrollHandle();
      });
  }

  onScroll() {
    const memeListNode = findDOMNode(this.memeList.current);

    if (!memeListNode) { return; }

    if (
      memeListNode.clientHeight <= window.innerHeight
      || window.pageYOffset >= memeListNode.clientHeight - (window.innerHeight * 1.4)
    ) {
      this.loadMemes();
    }
  }

  revertMemes = () => {
    this.setState({
      memes: [...this.state.memes].reverse()
    });
  }
}
