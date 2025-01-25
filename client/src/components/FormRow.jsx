import React from 'react'

const FormRow = ({type, name, labelText, defaultValue, onChange}) => {
  return (
    <div className='form-row'>
        <label htmlFor={name} className='form-label'>{labelText}</label>
        <input type={type} name={name} id={name} className='form-input' defaultValue={defaultValue || ''}
        onChange={onChange}          
        autoComplete='true' required />
    </div>
  )
}

export default FormRow
