import { useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiExit, BiMenu } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { BsGear, BsGearFill } from "react-icons/bs";
import { current } from "@reduxjs/toolkit";
import { NotificationsMenu } from "./Notification";

const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/plumbers",
    display: "Find a plumber",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const { currentUser } = useSelector((state) => state.user);

  const handleStickHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList.add("sticky__header");
      } else {
        headerRef.current?.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickHeader();

    return () => window.removeEventListener("scroll", handleStickHeader);
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      // console.log(res);
      // const data = await res.json();
      if (res.status !== 200) {
        dispatch(deleteUserFailure(res.body));
        return;
      }
      dispatch(deleteUserSuccess(res.body));
      navigate("/login");
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  return (
    <header className=" header flex items-center shadow-md" ref={headerRef}>
      <div className="container">
        <div className="flex justify-between">
          <a href="/">
            <h1 className="font-bold flex flex-wrap text-[21px]">
              <span className="text-blue-700">Plumb</span>
              <span className="text-slate-700">Ease</span>
            </h1>
          </a>
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500]"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="inline-flex gap-2">
                <NotificationsMenu />

                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={currentUser?.profileImageUrl}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            className={classNames(
                              "block px-4 py-1 text-sm text-gray-700 text-center border-b"
                            )}
                          >
                            loggedin as{" "}
                            <span className="text-primaryColor font-[800]">
                              {" "}
                              {currentUser.role}
                            </span>
                          </p>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 "
                            )}
                          >
                            <div className="inline-flex gap-2 items-center">
                              <BsGearFill />
                              Your Profile{" "}
                            </div>
                          </a>
                        )}
                      </Menu.Item>

                      <Menu.Item onClick={handleSignOut}>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            <div className="inline-flex gap-2 items-center">
                              <BiExit />
                              Sign Out
                            </div>
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer " />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
