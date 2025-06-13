'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import SearchBar from './SearchBar';
import Image from 'next/image';
import { IoBookmark, IoBookOutline, IoSearch } from "react-icons/io5";

export default function Sidebar({ setBlurActive }) {
  const sidebarRef = useRef();
  const textRef = useRef();
  const searchRef = useRef();
  const buttonRef1 = useRef();
  const buttonRef2 = useRef();
  const iconRef = useRef();
  const timelineRef = useRef();


  useEffect(() => {
    gsap.set(textRef.current, { x: -40, opacity: 0 });
    gsap.set(searchRef.current, { x: -40, opacity: 0, overflow: 'hidden' });
    gsap.set(buttonRef1.current, { x: -40, opacity: 0 });
    gsap.set(buttonRef2.current, { x: -40, opacity: 0 });
    gsap.set(sidebarRef.current, { width: '100px' });
    gsap.set(iconRef.current, { x: 30, opacity: 1 });
  }, []);

const handleMouseEnter = () => {
  setBlurActive(true);

  // Kill existing timeline
  if (timelineRef.current) timelineRef.current.kill();

  const tl = gsap.timeline();
  timelineRef.current = tl;

  tl.to(sidebarRef.current, { width: '250px', duration: 0.2, ease: 'power2.out' })
    .to(iconRef.current, { x: -60, opacity: 0, duration: 0.1, ease: 'power2.out' }, '<')
    .to(textRef.current, { x: 0, opacity: 1, duration: 0.1, ease: 'power2.out' }, '<')
    .to(searchRef.current, { x: -60, opacity: 1, duration: 0.1, ease: 'power2.out' }, '<')
    .to(buttonRef1.current, { x: -60, opacity: 1, duration: 0.1, ease: 'power2.out' }, '<')
    .to(buttonRef2.current, { x: -60, opacity: 1, duration: 0.1, ease: 'power2.out' }, '<');
};

  const handleMouseLeave = () => {
  setBlurActive(false);

  // Kill existing timeline
  if (timelineRef.current) timelineRef.current.kill();

  const tl = gsap.timeline();
  timelineRef.current = tl;

  tl.to(buttonRef2.current, { x: -40, opacity: 0, duration: 0.07, ease: 'power2.in' }, '<')
    .to(buttonRef1.current, { x: -40, opacity: 0, duration: 0.07, ease: 'power2.in' }, '<')
    .to(searchRef.current, { x: -40, opacity: 0, duration: 0.07, ease: 'power2.in' }, '<')
    .to(textRef.current, { x: -40, opacity: 0, duration: 0.07, ease: 'power2.in' }, '<')
    .to(iconRef.current, { x: 30, opacity: 1, duration: 0.07, ease: 'power2.in' }, '<')
    .to(sidebarRef.current, { width: '100px', duration: 0.07, ease: 'power2.in' });
};

  return (
    <div
      ref={sidebarRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="h-screen bg-[#EEEEEE] overflow-hidden text-white fixed left-0 z-50 top-0"
      style={{ width: '100px', transition: 'background 0.3s ease' }}
    >
        
      <div className="p-4 flex w-auto items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={248}
          height={129}
          className="w-[8vw]"
        />
        <div ref={textRef}>
          <Image
            src="/logoText.png"
            alt="Logo"
            width={200}
            height={129}
            className="w-auto"
          />
        </div>
      </div>
      <div className="flex  gap-4">
        <div ref={iconRef} className='mt-[2vh] text-4xl '><div className='mt-[3vh] text-stone-400'><IoSearch/></div><div className='mt-[3vh] text-stone-400'><IoBookOutline /></div><div className='mt-[3vh] text-stone-400 '><IoBookmark/></div></div>
    <div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-xl">
          
          <div ref={searchRef} className="flex-1">
            <SearchBar />
          </div>
          
        </div>
      </div>

      <div className="p-4">
        <a href="bookmark">
          <div
            ref={buttonRef1}
            className="bg-orange-500 rounded-md w-full flex items-center gap-2 p-2 text-lg"
          >
            <IoBookmark />
            <span>Bookmarks</span>
          </div>
        </a>
      </div>

      <div className="p-4">
        <a href="search">
          <div
            ref={buttonRef2}
            className="bg-orange-500 rounded-md w-full flex items-center gap-2 p-2 text-lg"
          >
            <IoBookOutline />
            <span>Recipes</span>
          </div>
        </a>
      </div>
      </div>
      </div>
    </div>
  );
}
