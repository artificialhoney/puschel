import React from 'react';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { Navigate, Route, Routes } from 'react-router-dom';

import authImg from '../../../assets/img/auth/auth.png';
import Footer from '../../components/footer/FooterAuthDefault';
import { switchDarkMode } from '../../static';
import SignIn from '../../views/auth/SignIn';

export default function Auth() {
  const [darkMode, setDarkMode] = React.useState(
    document.body.classList.contains('dark')
  );
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <button
          className="border-px fixed bottom-[30px] right-[35px] !z-[99] flex h-[60px] w-[60px] items-center justify-center rounded-full border-[#6a53ff] bg-gradient-to-br from-brandLinear to-blueSecondary p-0"
          onClick={() => {
            setDarkMode(switchDarkMode(!darkMode));
          }}
        >
          <div className="cursor-pointer text-gray-600">
            {darkMode ? (
              <RiSunFill className="h-4 w-4 text-white" />
            ) : (
              <RiMoonFill className="h-4 w-4 text-white" />
            )}
          </div>
        </button>
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                <Routes>
                  <Route path={`/sign-in`} element={<SignIn />} />
                  <Route
                    path="/"
                    element={<Navigate to="/auth/sign-in" replace />}
                  />
                </Routes>
                <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                  <div
                    className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                    style={{ backgroundImage: `url(${authImg})` }}
                  />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
