import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { UserTableProps } from "../constants/commontypes"
import {
    flexRender,
} from '@tanstack/react-table'
import { Button } from "./Button";
import { Loader } from "./Loader";
import { useEffect, useState } from "react";

function UserTable(props: UserTableProps) {
    if (props.isLoading) {
        return <Loader />
    }

    if (props.isError) {
        return <div className="text-center py-10 text-xl font-semibold">An error occured showing data...</div>
    }

    const [hasMatchingData, setHasMatchingData] = useState(true);

    useEffect(() => {
        if (!props.isError) {
            const hasMatchingRecords = props.table.getRowModel().rows.length > 0;
            setHasMatchingData(hasMatchingRecords);
        }
    }, [props.table.getRowModel().rows]);

    return (
        <div className="w-full">
            <div className="bg-white rounded ">
                <table className="min-w-max w-full">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        {props.table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                {headerGroup.headers.map(header => {

                                    return (
                                        <th key={header.id} className="py-3 px-6 text-left">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            { }
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>

                    <tbody className="text-gray-600 text-sm font-light">
                        {props.table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-100">
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td key={cell.id} className="py-[12.2px] px-6 text-left whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!hasMatchingData && <div className="text-center py-10 text-lg font-semibold">No matching filter data found!</div>}

                <div className="flex items-center justify-center gap-2 mt-3 py-2">
                    <Button
                        onClick={() => props.table.setPageIndex(0)}
                        disabled={!props.table.getCanPreviousPage()}
                    >
                        <ChevronsLeft />
                    </Button>
                    <Button
                        onClick={() => props.table.previousPage()}
                        disabled={!props.table.getCanPreviousPage()}
                    >
                        <ChevronLeft />
                    </Button>
                    <Button
                        onClick={() => props.table.nextPage()}
                        disabled={!props.table.getCanNextPage()}
                    >
                        <ChevronRight />
                    </Button>
                    <Button
                        onClick={() => props.table.setPageIndex(props.table.getPageCount() - 1)}
                        disabled={!props.table.getCanNextPage()}
                    >
                        <ChevronsRight />
                    </Button>
                    <div className=" ">
                        <div className="text-sm text-gray-700 flex gap-1">
                            Showing
                            <span className="font-medium">{props.table.getState().pagination.pageIndex + 1}</span>
                            of
                            <span className="font-medium">{props.table.getPageCount()}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserTable