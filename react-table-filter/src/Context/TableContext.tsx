import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TableContextType } from '../constants/commontypes';

interface TableContextProviderPropsWithChildren {
    children: ReactNode;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

const TableContextProvider: React.FC<TableContextProviderPropsWithChildren> = ({
    children,
}: TableContextProviderPropsWithChildren) => {
    const [selectedStatus, setSelectedStatus] = useState<string[]>(['active']);
    const [selectedAge, setSelectedAge] = useState<number | undefined>(undefined);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [likes, setLikes] = useState<number[]>([0]);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(true)

    const value: TableContextType = {
        selectedStatus,
        selectedAge,
        setSelectedDate,
        selectedDate,
        setSelectedStatus,
        setSelectedAge,
        likes,
        setLikes,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen
    };

    return (
        <TableContext.Provider value={value}>{children}</TableContext.Provider>
    );
};

const useTableContext = (): TableContextType => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error('useTableContext must be used within a TableContextProvider');
    }
    return context;
};

export { TableContextProvider, useTableContext };
