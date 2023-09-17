import { X } from "lucide-react";
import DebouncedInput from "./DebouncedInput";
import Filter from "./Filter";
import { useTableContext } from "../Context/TableContext";
import { HeaderGroup } from "@tanstack/react-table";

export const Sidebar = ({
    globalFilter = "",
    setGlobalFilter,
    table,
    columnFilters = [],
    setColumnFilters,
}) => {
    const {
        setSelectedStatus,
        setSelectedAge,
        setSelectedDate,
        setLikes,
    } = useTableContext();

    const handleClearAllFilter = () => {
        setSelectedStatus([]);
        setColumnFilters([]);
        setSelectedAge(undefined);
        setGlobalFilter("");
        setSelectedDate(null);
        setLikes([0]);
    };

    return (
        <div className="border-r border-gray-300 min-h-screen">
            <div className="px-4 py-6 border-b">
                <div className="relative">
                    <DebouncedInput
                        value={globalFilter}
                        onChange={(value) => setGlobalFilter(String(value))}
                        className="py-2 px-4 font-lg border border-gray-400 rounded-xl w-full focus:outline-none"
                        placeholder="Search all columns..."
                    />
                </div>
            </div>
            <div className="px-6 py-6">
                <div className="flex gap-5 items-center">
                    <h5 className="text-xl font-semibold text-gray-800">Filters</h5>
                    {columnFilters.length !== 0 &&
                        columnFilters.find((col) => col.id === "status")?.value[0] !== "none" ? (
                        <div
                            onClick={handleClearAllFilter}
                            className="flex items-center gap-2 text-red-500 py-0.5 px-2 bg-red-500/10 hover:bg-red-500/20 cursor-pointer rounded-md"
                        >
                            <span className="text-sm">Clear</span> <X size={15} />
                        </div>
                    ) : null}
                </div>
                <div className="">
                    {table &&
                        table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                            <div key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <div key={header.id}>
                                        {!header.isPlaceholder && <Filter column={header.column} />}
                                    </div>
                                ))}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};
