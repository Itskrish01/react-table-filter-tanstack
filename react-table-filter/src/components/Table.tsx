import React, { useEffect, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import { UserTableProps } from "../constants/commontypes";
import {
    flexRender,
} from '@tanstack/react-table';
import { Button } from "./Button";
import { Loader } from "./Loader";

function UserTable(props: UserTableProps) {
    const { isLoading, isError, table } = props;

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return (
            <div className="text-center py-10 text-xl font-semibold">
                An error occurred while fetching data...
            </div>
        );
    }

    const [hasMatchingData, setHasMatchingData] = useState<boolean>(true);

    useEffect(() => {
        if (!isError) {
            const hasMatchingRecords = table.getRowModel().rows.length > 0;
            setHasMatchingData(hasMatchingRecords);
        }
    }, [isError, table.getRowModel().rows]);

    const noDataMessage = (
        <div className="text-center py-10 text-lg font-semibold">
            No matching data found!
        </div>
    );

    return (
        <div className="w-full">
            <div className="bg-white rounded">
                {hasMatchingData ? (
                    <table className="min-w-max w-full">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id} className="py-3 px-6 text-left">
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody className="text-gray-600 text-sm font-light">
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="py-[12.2px] px-6 text-left whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    noDataMessage
                )}

                <div className="flex items-center justify-center gap-2 mt-3 py-2">
                    <Button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronsLeft />
                    </Button>
                    <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft />
                    </Button>
                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight />
                    </Button>
                    <Button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronsRight />
                    </Button>
                    <div className="text-sm text-gray-700 flex gap-1">
                        Showing <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span> of{" "}
                        <span className="font-medium">{table.getPageCount()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserTable;
