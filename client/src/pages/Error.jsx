import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';

const Error = () => {
  const error = useRouteError();

  if (error.status == 404) {
    return(<Wrapper>
      <div>
        <img src={img} alt='not found' className='img' />
        <h3>Page not found</h3>
        <p>Can't find it</p>
        <Link to='/dashboard' className='btn'>back to dashboard</Link>
      </div>
    </Wrapper>);
  }

  console.log(error);
  return (
  
    <div><h1>Something Went Wrong</h1>
      <Link to='/'>back home</Link></div>
  );
};

export default Error
