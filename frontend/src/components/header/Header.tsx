import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetClose,
} from '@/shadcn/components/ui/sheet';
import { Button } from '@/shadcn/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuLink,
} from '@/shadcn/components/ui/navigation-menu';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Menu } from 'lucide-react';
import Logo from '@/assets/vectors/logo.svg?react';
import React from 'react';
import { ModeToggle } from '@/shadcn/components/mode-toggle.tsx';

interface IProps {
    isBlurred: boolean;
    showNav: boolean;
}

export default function Header({ isBlurred, showNav }: IProps) {
    const location = useLocation();

    const pageTitles = new Map<string, string>([
        ['/', 'Pause Loop'],
        ['/vision', '20/20/20 Vision Timer'],
        ['/pomodoro', 'Pomodoro Timer'],
        ['/noise', 'Brown Noise'],
        ['/breathing', 'Breathing'],
    ]);

    const currentTitle = pageTitles.get(location.pathname);

    return (
        <header className={`sticky top-0 z-50 w-full shrink-0`}>
            <div
                className={`container mx-auto flex h-20 shrink-0 items-center ${showNav ? 'justify-between' : 'justify-center'} px-4 duration-150 hover:opacity-100 md:px-6 lg:opacity-15 ${isBlurred ? 'backdrop-blur-sm' : ''}`}>
                {showNav && (
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant='outline'
                                size='icon'
                                className='border-black bg-transparent bg-white bg-opacity-25 dark:border-white lg:hidden'>
                                <Menu className='h-6 w-6' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side='left'>
                            <NavLink to='/'>
                                <Logo className='h-6 w-6 fill-black stroke-black dark:fill-white dark:stroke-white' />
                                <span className='sr-only'>ShadCN</span>
                            </NavLink>
                            <div className='grid gap-2 py-6'>
                                <SheetClose asChild>
                                    <NavLink
                                        to='/vision'
                                        className='flex w-full items-center py-2 text-lg font-semibold'>
                                        Vision Timer
                                    </NavLink>
                                </SheetClose>
                                <SheetClose asChild>
                                    <NavLink
                                        to='/pomodoro'
                                        className='flex w-full items-center py-2 text-lg font-semibold'>
                                        Pomodoro
                                    </NavLink>
                                </SheetClose>
                                <SheetClose asChild>
                                    <NavLink
                                        to='/noise'
                                        className='flex w-full items-center py-2 text-lg font-semibold'>
                                        Brown Noise
                                    </NavLink>
                                </SheetClose>
                                <SheetClose asChild>
                                    <NavLink
                                        to='/breathing'
                                        className='flex w-full items-center py-2 text-lg font-semibold'>
                                        Breathing
                                    </NavLink>
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
                )}
                {showNav && (
                    <NavLink
                        to='/'
                        className='mr-6 hidden lg:flex'>
                        <Button
                            variant='outline'
                            size='icon'
                            className='border-black bg-transparent bg-white bg-opacity-25 dark:border-white'>
                            <Home className='h-6 w-6' />
                        </Button>
                    </NavLink>
                )}
                {showNav && (
                    <NavigationMenu className='hidden lg:flex'>
                        <NavigationMenuList>
                            <NavigationMenuLink asChild>
                                <NavLink to='/vision'>
                                    <Button variant={'link'}>
                                        Vision Timer
                                    </Button>
                                </NavLink>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                                <NavLink to='/pomodoro'>
                                    <Button variant={'link'}>Pomodoro</Button>
                                </NavLink>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                                <NavLink to='/noise'>
                                    <Button variant={'link'}>
                                        Brown Noise
                                    </Button>
                                </NavLink>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                                <NavLink to='/breathing'>
                                    <Button variant={'link'}>Breathing</Button>
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuList>
                    </NavigationMenu>
                )}
                {showNav && (
                    <div className='opacity-50 lg:hidden'>{currentTitle}</div>
                )}
                <ModeToggle />
            </div>
        </header>
    );
}
