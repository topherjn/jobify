import { FormRow, FormRowSelect, SubmitBtn } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          {/* search position */}

          <FormRow
            type='search'
            name="search"
            labelText="Search"
            defaultValue='a'
          />
          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue='all'
          />
          <FormRowSelect
            labelText='job type'
            name='jobType'
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue='all'
          />
          <FormRowSelect
            name='sort'
            list={[...Object.values(JOB_SORT_BY)]}
            defaultValue='newest'
          />

          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>
          {/* TEMP!!!! */}
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
