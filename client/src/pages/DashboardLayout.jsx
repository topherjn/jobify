import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import { createContext, useContext, useState } from 'react';
import { checkDefaultTheme } from '../App';
import customFetch from '../utils/customFetch';

export const loader = async () => {
  try {
    const { data } = await customFetch('/users/current-user');
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return redirect('/');
  }
};

const DashboardContext = createContext();

const DashboardLayout = ({isDarkThemeEnabled}) => {
  const user = useLoaderData();
  console.log(user);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    console.log('Logout user');
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
