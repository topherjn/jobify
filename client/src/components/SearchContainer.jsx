import { FormRow, FormRowSelect, SubmitBtn } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
  const submit = useSubmit();
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
            onChange={(e) => {submit(e.currentTarget.form)}}
          />
          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue='all'
            onChange={(e) => {submit(e.currentTarget.form)}}
          />
          <FormRowSelect
            labelText='job type'
            name='jobType'
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue='all'
            onChange={(e) => {submit(e.currentTarget.form)}}
          />
          <FormRowSelect
            name='sort'
            list={[...Object.values(JOB_SORT_BY)]}
            defaultValue='newest'
            onChange={(e) => {submit(e.currentTarget.form)}}
          />

          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
