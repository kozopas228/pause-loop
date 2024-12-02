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
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import logo from '/logo.svg';
import React from 'react';
import { ModeToggle } from '@/shadcn/components/mode-toggle.tsx';

export default function Header() {
    return (
        <header className='sticky top-0 z-10 w-full shrink-0'>
            <div className='container mx-auto flex h-20 shrink-0 items-center justify-between px-4 md:px-6'>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant='outline'
                            size='icon'
                            className='lg:hidden'>
                            <Menu className='h-6 w-6' />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='left'>
                        <NavLink to='/'>
                            <img
                                src={logo}
                                className='h-6 w-6'
                                alt='logo'
                            />
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
                <NavLink
                    to='/'
                    className='mr-6 hidden lg:flex'>
                    <img
                        src={logo}
                        className='h-6 w-6'
                        alt='logo'
                    />
                </NavLink>
                <NavigationMenu className='hidden rounded-lg border border-gray-500 bg-white bg-opacity-50 lg:flex'>
                    <NavigationMenuList>
                        <NavigationMenuLink asChild>
                            <NavLink to='/vision'>
                                <Button variant={'ghost'}>Vision Timer</Button>
                            </NavLink>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <NavLink to='/pomodoro'>
                                <Button variant={'ghost'}>Pomodoro</Button>
                            </NavLink>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <NavLink to='/noise'>
                                <Button variant={'ghost'}>Brown Noise</Button>
                            </NavLink>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <NavLink to='/breathing'>
                                <Button variant={'ghost'}>Breathing</Button>
                            </NavLink>
                        </NavigationMenuLink>
                    </NavigationMenuList>
                </NavigationMenu>
                <ModeToggle />
            </div>
        </header>
    );
}
