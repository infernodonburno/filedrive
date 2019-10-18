import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { post } from 'axios'
export const FileUpload = props => {
  const { handleSubmit } = props
  console.log(`props: ${props}`)
  const onFormSubmit = data => {
    console.log(`data: ${data}`)
    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('profile_pic', data.profile_pic[0])
    console.log(`formData: ${formData}`)
  }
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <label>Name</label>
        <Field name='name' component='input' type='text' />
      </div>
      <div>
        <label>Profile Picture</label>
        <Field name='profile_pic' component='input' type='file' />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default reduxForm({
  form: 'fileupload'
})(FileUpload)
