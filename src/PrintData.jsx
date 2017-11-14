import React, { Component } from 'react';

  
  class PrintData extends Component {
    state = {
      id: false
    }
    
    fetchData = async () => {
      const url = 'https://ponychallenge.trustpilot.com/pony-challenge/maze'
      // The data we are going to send in our request
      let data = {
          "maze-width": 20,
          "maze-height": 20,
          "maze-player-name": "Applejack",
          "difficulty": 2
      }
      
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }


    printData = async () => {
      try {
        const data = await this.fetchData()
        const json = await data.json()
        this.props.changeId(json.maze_id)
        this.setState({id: json.maze_id})
      } catch(e) {
        console.error("Problem", e)
      }
    }

    render() {
      return (
        <div className="App">
          <button onClick={this.printData} >
            Get ID    
          </button>
          <div>
            {this.state.id}
          </div>
          {/*Width<input id='maze-wigth' />
          Height<input id='maze-heigth' />
          Player name<input id='maze-player-name' />
      Difficulty<input id='difficulty' />*/}
        </div>
      );
    }
  }
  
  export default PrintData