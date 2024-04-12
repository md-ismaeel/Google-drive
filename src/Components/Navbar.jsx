import React, { useContext, useRef, useState, useEffect } from 'react'
import logo from "../assets/drive_logo.png"
import { IoMdSearch } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { MdOutlineOfflinePin } from "react-icons/md";
import { MdOutlineContactSupport } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoApps } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { UserContext } from '../Context/Context';
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {

    const { fileView, setFileView, user, setUser, showProfile, setShowProfile } = useContext(UserContext)
    const searchRef = useRef(null);
    const profileRef = useRef(null)


    const HandleFilter = () => {
        let searchInput = searchRef.current.value.toLowerCase();

        const filteredData = fileView.filter((e) => {
            return (e.data.caption.includes(searchInput))
        })
        setFileView(filteredData)
    }

    const handleLogOut = () => {
        // navigator('/')
        setUser(user => !user)
    }

    const handleOpen = () => {
        setShowProfile(true)
    }
    const handleClose = () => {
        setShowProfile(false)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                handleClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className='w-full h-[70px] px-6 flex justify-between items-center'>

            <NavLink to={'/home'} className='w-[20%]text-xl flex justify-center items-center gap-3'>
                <img src={logo} height={'40px'} width={'45px'} />
                <p className='opacity-70 hover:underline text-lg'>Drive</p>
            </NavLink>

            <div className='w-[52%] relative'>

                <input type='text'
                    ref={searchRef}
                    onChange={HandleFilter}
                    placeholder='Search in Drive'
                    className='w-full ml-6 text-lg text-black bg-slate-200 py-[10px] px-16 rounded-full outline-none focus:outline-none focus:border focus:bg-white focus:drop-shadow-xl'
                />
                <p className='absolute top-1 left-9 text-2xl hover:bg-slate-200 rounded-full p-2'><IoMdSearch /></p>
                <p className='absolute top-1 right-0 text-2xl hover:bg-slate-200 rounded-full p-2'><svg className="Q6yead QJZfhe " width="24" height="24" viewBox="0 0 24 24" focusable="false"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path></svg></p>

            </div>


            <ul className='w-[18%] flex text-2xl justify-between items-center'>
                <span><MdOutlineOfflinePin className='cursor-pointer' /></span>
                <span><MdOutlineContactSupport className='cursor-pointer' /></span>
                <span><IoSettingsOutline className='cursor-pointer' /></span>
                <span><IoApps className='cursor-pointer' /></span>
                <span onClick={handleOpen} className='text-4xl '>
                    {user && user.photoURL ? (
                        <img src={user.photoURL} alt="User Profile" height={'50px'} width={'40px'} className='rounded-full relative text-xs bg-center' />
                    ) : (
                        <MdAccountCircle className='text-gray-400' />
                    )}

                </span>
                {showProfile ? (
                    <div ref={profileRef} className='absolute w-[150px] flex flex-col justify-center items-center top-14 right-10 text-base bg-white drop-shadow-2xl z-10 py-2  rounded-lg'>
                        <p className='w-full text-center py-1'>My Acc</p>
                        <p onClick={handleLogOut} className='w-full flex justify-center items-center gap-2 text-center cursor-pointer py-2'>LogOut<IoMdLogOut className='text-red-500' /></p>
                    </div>)
                    : ''}
            </ul>
        </div>
    )
}

export default Navbar
