import React, {Component} from 'react'
import './Board.scss'
import Tile from '../Tile/Tile'
import TilesMatch from '../TilesMatch/TilesMatch'

class Board extends Component {
    constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
      this.newGame = this.newGame.bind(this);
      this.memoryTiles = new TilesMatch();
    }
  
    componentWillMount() {
      this.initGame();
    }
  
    initGame() {
      this.memoryTiles.generateTiles();
      this.setState({
        turn: 0,
        found: 0,
        flipped: 0,
        firstId: undefined,
        secondId: undefined
      });
    }
  
    getTileSet() {
      let tileViews = [];
      this.memoryTiles.tiles.forEach(tile => {
        let TileView = 
          <Tile
            id={tile.id} 
            image={tile.image}
            face={tile.face}
            onClick={this.onClick}
          />;
        tileViews.push(TileView);
      });
      return tileViews;
    }
  
    clearTiles() {
      if (this.state.flipped !== 2) {
        return;
      }
      this.memoryTiles.flipTile(this.state.firstId);
      this.memoryTiles.flipTile(this.state.secondId);
      this.setState({
        firstId: undefined,
        secondId: undefined,
        flipped: 0,
        turn: this.state.turn+1
      });
    }
  
    onClick(id) {
      if (this.state.flipped === 0 || this.state.flipped === 2) {
        if (this.state.flipped === 2) {
          clearTimeout(this.timeout);
          this.clearTiles(this.state.firstId, this.state.secondId);        
        }
        this.memoryTiles.flipTile(id, true);
        this.setState({
          firstId: id,
          flipped: 1
        });
      } else if (this.state.flipped === 1) {
        this.memoryTiles.flipTile(id, true);
        this.setState({
          secondId: id,
          flipped: 2
        });
  
        if (this.memoryTiles.sameTiles(id, this.state.firstId)) {
          this.memoryTiles.matchedTiles(this.state.firstId, true);
          this.memoryTiles.matchedTiles(id, true);
          this.setState({
            found: this.state.found+1,
            firstId: undefined,
            secondId: undefined,
            turn: this.state.turn+1,
            flipped: 0
          });
  
        } else {
          this.timeout = setTimeout(() => { 
            this.clearTiles(this.state.firstId, this.state.secondId);
          }, 2000); 
        }
      }
    }
  
    newGame() {
      this.initGame();
    }
  
    render() {
    let tileViews = this.getTileSet();
    
    let gameStatus = 
        <div className='status'>
            <h1>Collect 8 great houses of Westeros</h1>
            <p>turn: {this.state.turn}</p>
            <p>houses collected: {this.state.found}</p>
        </div>;
  
    if (this.state.found === this.memoryTiles.tileNo) {
    gameStatus = 
        <div>
            <div className="victory">congratulations, you won!</div>
            <div>you used {this.state.turn} turns</div>
            <button className='newGame' onClick={this.newGame}>new game</button>
        </div>;      
      }
  
      return (
        <div>
            <div>{gameStatus}</div>
            <div className='board'>{tileViews}</div>
        </div>
      );
    }
  }
  
export default Board