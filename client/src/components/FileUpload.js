import React from 'react'
import { Field, reduxForm } from 'redux-form'
export const FileUpload = props => {
  const { handleSubmit } = props
  console.log(`props: ${props}`)
  const onFormSubmit = data => {
    console.log(`data: ${data}`)
    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('file', data.file[0])
    console.log(`formData: ${formData}`)
  }
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <label>Upload File</label>
        <Field name='file' component='input' type='file' />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default reduxForm({
  form: 'fileupload'
})(FileUpload)
