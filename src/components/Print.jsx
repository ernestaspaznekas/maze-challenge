import React, { Component } from 'react'
import ArrowKeysReact from 'arrow-keys-react'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'


  
  class Print extends Component {
      state = {
        data: false,
        direction: false,
        message: false,
        img: false
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
            console.log(text)                         
            if (text['state'] === 'active') {
                this.setState({message: text['state-result']})
                this.printData()                
            }
            if (text['state'] === 'won') {
                this.setState({message: text['state-result'],img: true})
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

    
    let data = false
    if (this.state.img) {
        data =  (
            <div id='map'>
                <img 
                    style={{maxWidth: '60%'}} 
                    src='https://ponychallenge.trustpilot.com/eW91X3NhdmVkX3RoZV9wb255.jpg' 
                />
                <div>
                    <Button raised color="primary">
                        Play again
                    </Button>
                </div>
            </div>
        )
    } else if (this.state.data) {
        data = (
            <div id='map' {...ArrowKeysReact.events} tabIndex="1">
                <pre>{this.state.data}</pre>
            </div>
        )
    }

    return (
        <div className="App">
          <button onClick={this.printData} >
          Print
          </button>
          <div id='message'>
            <Typography type="headline" component="h3">
                {this.state.message}
            </Typography>
          </div>
          {data}
        </div>
      );
    }
  }
  
  export default Print