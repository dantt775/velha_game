import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button } from 'react-native';




export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
      hasWinner: false,
      velhaCounter: 0,

    }
  }

  onPress = (row, col) => {
    var value = this.state.gameState[row][col];
    if (value !== 0 && this.state.velhaCounter<9 && this.state.hasWinner===false) { return; }


    var currentPlayer = this.state.currentPlayer;
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;

    this.setState({ gameState: arr, velhaCounter: this.state.velhaCounter + 1 })
    this.nextPlayer();

  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col]
    switch (value) {
      case 1: return <View><Text style={styles.iconX}>X</Text></View>
      case -1: return <Text style={styles.iconO}>O</Text>
      default: return <Text></Text>
    }
  }

  componentDidMount() {
    this.initializeGame();
  }


  getWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;

    //check rows
    for (i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum === 3) { return sum; }
      else if (sum === -3) { return sum;; }
    }

    //check columns
    for (i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum === 3) { return sum;}
      else if (sum === -3) { return sum; }
    }

    //check diagonals
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum === 3) { return sum; }
    else if (sum === -3) { return sum; }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum === 3) { return sum; }
    else if (sum === -3) { return sum; }

  }


  checkWinnerOrVelha = () => {
    if (this.state.velhaCounter === 9) {
      this.initializeGame();
    }


    var sum = this.getWinner();
    

    switch (sum) {
      case 3:
        this.setState({ hasWinner: true, winner: this.state.currentPlayer })
        break;
      case -3:
        this.setState({ hasWinner: true, winner: this.state.currentPlayer })
        break;
      default:
        break;
    }

    if (this.state.hasWinner === true) {
      this.initializeGame();
    }

  }


  checkGameState = () => {

    if (this.state.hasWinner === true) {
      return <Text>Jogador numero {this.state.winner === 1 ? 1 : 2} venceu!!!!</Text>
    } else if (this.state.velhaCounter === 9) {
      return <Text>Deu Velha!</Text>
    } else {
      return <Text></Text>
    }
  }


  nextPlayer = () => {
    this.checkWinnerOrVelha();

    if (this.state.hasWinner == false) {
      var actualPlayer = this.state.currentPlayer;
      var nextPlayer = actualPlayer === 1 ? -1 : 1;
      this.setState({ currentPlayer: nextPlayer })
    }
  }

  initializeGame = () => {
    this.setState({
      gameState:
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
      currentPlayer: 1,
      hasWinner: false,
      winner: 0,
      velhaCounter: 0
    });
  }


  render() {
    return (
      <View style={styles.container}>
        {this.state.hasWinner === false && this.state.velhaCounter < 9 ? <Text>Vez do jogador {this.state.currentPlayer === 1 ? 1 : 2}</Text> : <Text></Text>}
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onPress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onPress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onPress(0, 2)} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onPress(1, 0)} style={[styles.tile, { borderLeftWidth: 0, }]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onPress(1, 1)} style={[styles.tile, {}]}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onPress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>


        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onPress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onPress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onPress(2, 2)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View>{this.checkGameState()}</View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tile: {
    borderWidth: 1,
    width: 100,
    height: 100,
  },
  iconX: {
    color: 'red',
    fontSize: 50,
    textAlign: 'center',
  },
  iconO: {
    color: 'green',
    fontSize: 60,
    textAlign: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
