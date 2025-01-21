import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';
import {toast} from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  // turns the params into an object we can work with
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful, please login');
    return redirect('/login');
  } catch (error) {
      toast.error(error?.response?.data?.error || 'An error occurred');
      return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' labelText='Name' />
        <FormRow type='text' name='lastName' labelText='Last Name' defaultValue='Smith' />
        <FormRow type='text' name='location' labelText='Location' defaultValue='Earth' />
        <FormRow type='email' name='email' labelText='Email' defaultValue='john@gmail.com' />
        <FormRow type='password' name='password' labelText='Password' defaultValue='secret123' />
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <p>Already a member?
          <Link to='/login' className='member-btn'>Login</Link></p>
      </Form>
    </Wrapper>
  )
}

export default Register;
