import React, { Component }  from 'react'

class Tile extends Component {
constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.matched && !this.props.face) {
      this.props.onClick(this.props.id, this.props.image);      
    }
  }

  render() {
    let imPath = './images/';
    if (this.props.face) {
      imPath = `${imPath}${this.props.image}.png`;
    } else {
      imPath = `${imPath}back.jpg`;
    }

    return (
      <img 
        className={'tile'} 
        src={require(`${imPath}`)} 
        alt='tile' 
        onClick={this.onClick}
      />
    );      
  };
};

export default Tile
