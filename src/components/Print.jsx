import React, { Component } from 'react'
import ArrowKeysReact from 'arrow-keys-react'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

const TrustUrl = 'https://ponychallenge.trustpilot.com'

class Print extends Component {
state = {
    data: false,
    direction: false,
    message: false,
    img: false,
    mazeId: false
}

fetchId = async () => {
    const url = `${TrustUrl}/pony-challenge/maze`
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


printId = async () => {
    try {
        const data = await this.fetchId()
        const json = await data.json()
        //this.props.changeId(json.maze_id)
        this.setState({
            mazeId: json.maze_id, 
            img: false, message: 
            false, direction: 
            false
        })
    } catch(e) {
        console.error("Problem", e)
    }
}

fetchData = async () => {
    let params = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    }
    let url = `${TrustUrl}/pony-challenge/maze/${this.state.mazeId}/print`
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
    let url = `${TrustUrl}/pony-challenge/maze/${this.state.mazeId}`
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
        //console.log(text)                         
        if (text['state'] === 'active') {
            this.setState({message: text['state-result']})
            this.printData()                
        }
        if (text['state'] === 'won') {
            this.setState({
                message: text['state-result'],
                img: text['hidden-url'], 
                mazeId: false, 
                data: false, 
                direction: false})
        }
        if (text['state'] === 'over') {
            this.setState({
                message: text['state-result'],
                img: text['hidden-url'], 
                mazeId: false, 
                data: false, 
                direction: false
            })
        }
    })
    } catch(e) {
    console.error("Problem", e)
    }
}

render() {
    ArrowKeysReact.config({
        left: () => {
            this.setState(
                {direction: 'west'},
                () => this.printMove()
            )  
        },
        right: () => {              
            this.setState(
                {direction: 'east'},
                () => this.printMove()
            )  
        },
        up: () => {
            this.setState(
                {direction: 'north'},
                () => this.printMove()
            )
        },
        down: () => {
            this.setState(
                {direction: 'south'},
                () => this.printMove()
            )   
        }
    })  


    let data = false
    if (this.state.img) {
        data =  (
            <div>
                <img 
                    style={{maxWidth: '60%'}} 
                    src={`${TrustUrl}${this.state.img}`}
                    alt='Game'
                />
            </div>
        )
    } else if (this.state.data) {
        data = (
            <div 
                {...ArrowKeysReact.events} 
                tabIndex="1"
            >
                <pre>{this.state.data}</pre>
            </div>
        )
    }

    let buttonText = 'Play'
    if (this.state.img) {
        buttonText = 'Play Again'
    } 

    let gButton = (
        <Button raised color="primary" onClick={this.printId}>
            {buttonText}        
        </Button>
    )
    if (this.state.mazeId) {
        gButton = (
            <Button raised color="primary" onClick={this.printData}>
                Play Game      
            </Button>
        )
    }

    return (
        <div className="App">
            <div>
            {gButton}
            </div>
            <div id='message'>
            <Typography type="headline">
                {this.state.message}
            </Typography>
            </div>
            <div>
            {data}
            </div>
        </div>
        )
    }
}
export default Print