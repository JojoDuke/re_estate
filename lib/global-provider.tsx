import React, { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useAppwrite } from "./useAppwrite";
import { getUser } from "./appwrite";

interface User {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    name: string;
    email: string;
    registration: string;
    password?: string;
    hash?: string;
    hashOptions?: object;
    avatar?: string;
    accessedAt: string;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null | undefined;
    loading: boolean;
    refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

const defaultContextValue: GlobalContextType = {
    isLoggedIn: false,
    user: null,
    loading: true,
    refetch: async () => {}
};

export const GlobalContext = createContext(defaultContextValue);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const {
        data: user,
        loading,
        refetch,
    } = useAppwrite({
        fn: getUser,
        params: {} as Record<string, string | number>
    });

    const isLoggedIn = !!user;

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            user,
            loading,
            refetch
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }

    return context;
}

export default GlobalContext;


