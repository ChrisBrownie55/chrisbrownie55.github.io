import React from 'react'

export default props => {
  const name = props.name || props.id
  const input = props.type === 'textarea' ?
    <textarea
      id={ props.id }
      name={ name }
      required={ props.required } /> :
    <input
      type={ props.type }
      id={ props.id }
      name={ name }
      required={ props.required } />
  return (
    <div className={`float-input ${props.className || ''}`}>
      { input }
      <label htmlFor={ props.id }>
        { props.children }
      </label>
    </div>
  )
}