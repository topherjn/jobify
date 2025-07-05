import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Take control of your job search. Our intuitive tracking tool helps you manage every application, from initial submission to final interview. Stay organized, monitor your progress, and never miss an opportunity. Sign up today to streamline your path to your next career.
          </p>
          <Link to='/register' className='btn register-link'>register</Link>
          <Link to='/login' className='btn'>Login / Demo User</Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
