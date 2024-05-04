'use client';
import Link from 'next/link';
import { useRef } from 'react';

import BLOG from '@/blog.config';

const NavBar = () => {
  const links = [
    { id: 0, name: 'Blog', to: BLOG.path || '/', show: true },
    { id: 1, name: 'About', to: '/about', show: BLOG.showAbout },
    { id: 2, name: 'RSS', to: '/feed', show: true },
    { id: 3, name: 'Search', to: '/search', show: true },
  ];
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          (link) =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>{link.name}</Link>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

const Header = ({
  navBarTitle,
  fullWidth,
}: {
  navBarTitle: string | null;
  fullWidth: boolean;
}) => {
  const useSticky = !BLOG.autoCollapsedNavBar;
  const navRef = useRef<HTMLElement>(null);
  const sentinalRef = useRef<HTMLElement>(null);
  const handler = ([entry]: [any]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current.classList.add('sticky-nav-full');
      } else {
        navRef.current.classList.remove('sticky-nav-full');
      }
    } else {
      navRef?.current?.classList.add('remove-sticky');
    }
  };

  return (
    <>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id="sticky-nav"
      >
        <div className="flex items-center">
          <Link href="/">
            <div className="h-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="24"
                  height="24"
                  className="fill-current text-black dark:text-white"
                />
                <rect width="24" height="24" fill="url(#paint0_radial)" />
                <defs>
                  <radialGradient
                    id="paint0_radial"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="rotate(45) scale(39.598)"
                  >
                    <stop stopColor="#CFCFCF" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#E9E9E9" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </Link>
          {navBarTitle ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
          ) : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title},{' '}
              <span className="font-normal">{BLOG.description}</span>
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  );
};

export default Header;
