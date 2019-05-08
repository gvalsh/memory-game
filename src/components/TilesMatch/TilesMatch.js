import shuffle from 'shuffle-array';

class TilesMatch {
  constructor() {
    this.tiles= [];
    this.tileNo = 8;
  }

  generateTiles() {
    this.tiles= [];
    let id=1;
    for(let i=1; i <= this.tileNo; i++) {
      let tile1 = {
        id: id,
        image: i,
        face: false,
        matched: false,
      };
      id++;
      let tile2 = {
        id: id,
        image: i,
        face: false,
        matched: false,
      };
      this.tiles.push(tile1);
      this.tiles.push(tile2);
      id++;
    }
    shuffle(this.tiles);  
  }

  getTile(id) {
    for(let i=0; i < 2*this.tileNo; i++) {
      if (this.tiles[i].id === id) {
        return this.tiles[i];
      }
    };
  }

  flipTile(id, face) {
    this.getTile(id).face = face;
  }

  matchedTiles(id, matched) {
    this.getTile(id).matched = matched;
  }

  sameTiles(id1, id2) {
    return this.getTile(id1).image === this.getTile(id2).image;
  }
};

export default TilesMatch;
