import { h, Component } from 'preact'
import style from './styles/FloatInput.styl'

class FloatInput extends Component {
  constructor(props) {
    super(props)
    this.className = `float-input ${this.props.className || ''} ${this.props.type === 'textarea' ? 'float-textarea' : ''}`
  }

  handleInput(event) {
    event.target.value === ''
      ? event.target.classList.remove('notempty')
      : event.target.classList.add('notempty')
  }

  render() {
    const name = this.props.name || this.props.id
    
    const input = this.props.type === 'textarea'
      ? <textarea
          id={ this.props.id }
          name={ name }
          required={ this.props.required }
          onInput={ this.handleInput }
        />
      : <input
          type={ this.props.type }
          id={ this.props.id }
          name={ name }
          required={ this.props.required }
          onInput={ this.handleInput }
        />

    return (
      <div className={ this.className }>
        { input }
        <label htmlFor={ this.props.id }>
          { this.props.children }
        </label>
      </div>
    )
  }
}

export default FloatInput