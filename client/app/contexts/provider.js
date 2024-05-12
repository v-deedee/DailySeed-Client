import React from 'react';
import { UserProvider } from './user.context';
import { TreeProvider } from './tree.context';
import { SeedProvider } from './seed.context';
import { HabitProvider } from './habit.context';

const AllProviders = ({ children }) => (
    <UserProvider>
        <SeedProvider>
            <TreeProvider>
                <HabitProvider>
                   { children }
                </HabitProvider>
            </TreeProvider>
        </SeedProvider>
    </UserProvider>
);

export default AllProviders;