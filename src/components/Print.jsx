import React, { Component } from 'react'
import ArrowKeysReact from 'arrow-keys-react'


  
  class Print extends Component {
      state = {
        data: false,
        direction: false,
        message: false,
      }

    fetchData = async () => {
        let params = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        }
        let url = `https://ponychallenge.trustpilot.com/pony-challenge/maze/${this.props.mazeId}/print`
        return fetch(url, params)
    }


    printData = async () => {
      try {
        const data = await this.fetchData()
        const json = await data
        
        json.text().then((text) => {
            this.setState({data: text})
        })
      } catch(e) {
        console.error("Problem", e)
      }
    }

    fetchMove = async () => {
        let data = {
            direction: this.state.direction
        }
        let url = `https://ponychallenge.trustpilot.com/pony-challenge/maze/${this.props.mazeId}`
        let params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        return fetch(url, params)
    }


    printMove = async () => {
      try {
        const data = await this.fetchMove()
        const json = await data
        json.text().then((text) => {
            text = JSON.parse(text)                          
            if (text['state'] === 'active') {
                this.setState({message: text['state-result']})
                this.printData()                
            }
        })
      } catch(e) {
        console.error("Problem", e)
      }
    }

    render() {
    ArrowKeysReact.config({
        left: () => {
            this.setState({direction: 'west'},() => this.printMove())  
        },
        right: () => {              
            this.setState({direction: 'east'},() => this.printMove())  
        },
        up: () => {
            this.setState({direction: 'north'},() => this.printMove())
        },
        down: () => {
            this.setState({direction: 'south'},() => this.printMove())   
        }
    })    

    return (
        <div className="App">
          <button onClick={this.printData} >
          Print
          </button>
          <div id='message'>
            {this.state.message}
          </div>
          <div id='map' {...ArrowKeysReact.events} tabIndex="1">
            <pre>{this.state.data}</pre>
          </div>
        </div>
      );
    }
  }
  
  export default Print