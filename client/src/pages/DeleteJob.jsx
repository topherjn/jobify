import { redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async({ params }) => {
  try {
    console.log(params.id);
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success('Job deleted successfully');
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.msg);
  }
  return redirect('/dashboard/all-jobs');
};