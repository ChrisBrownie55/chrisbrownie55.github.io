import TypeIt from 'typeit'
import React, { Component } from 'react'

class Messages extends Component {
  constructor(props) {
    super(props)
    this.messagesShown = []
    this.messages = this.props.messages.slice()
  }

  componentDidMount() {
    setTimeout(() => {
      this.typer = new TypeIt(`#${this.props.id} > .text-bar > .input`, {
        
      }, false)
    }, 1000)
  }

  render() {
    const messages = this.messagesShown.map(
      (text, i) => <div className={ `message ${!(i%2) ? 'received' : 'sent'}` }>{ text }</div>
    )

    return (
      <div className='screen' id={ this.props.id }>
        <div className='conversation'>
          { messages }
        </div>
        <div className='text-bar'>
          <p className='input'>Type a message...</p>
        </div>
      </div>
    )
  }
}

export default Messages