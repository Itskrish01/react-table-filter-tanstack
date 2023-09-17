import './App.css'
import { useEffect, useMemo } from "react"
import Header from './components/Header'
import { useQuery } from "@tanstack/react-query"
import { getUsers } from './lib/utils'
import UserTable from './components/Table'
import { Sidebar } from './components/Sidebar'
import { useState } from 'react'
import { ColumnFiltersState, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getSortedRowModel } from '@tanstack/react-table'
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import { User } from './constants/commontypes'
import moment from 'moment'
import { useTableContext } from './Context/TableContext'
import MobileSidebar from './components/MobileSidebar'

const columnHelper = createColumnHelper<User>();

function App() {
  const dateFilter: any = (rows: any, id: any, filterValue: any) => {
    let currentDate = moment(new Date())
    let selectedDate = moment(filterValue)
    return moment(rows.original.last_visit).isBetween(selectedDate, currentDate)
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('age', {
        header: () => 'Age',
        cell: info => info.renderValue(),
      }),
      columnHelper.accessor('status', {
        header: () => "Status",
        cell: info => info.renderValue(),
        filterFn: 'arrIncludesSome'
      }),
      columnHelper.accessor('last_visit', {
        header: () => <span>Last visit</span>,
        cell: info => moment(info.getValue()).fromNow(),
        filterFn: dateFilter
      }),
      columnHelper.accessor('likes', {
        header: 'Likes',
      }),
    ],
    [])

  const { data, isLoading, isError } = useQuery({ queryKey: ['user'], queryFn: getUsers })
  const { isMobileSidebarOpen, setIsMobileSidebarOpen } = useTableContext()
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  console.log(columnFilters)

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters: columnFilters,
      globalFilter: globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    filterFns: {
      date: dateFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  })

  useEffect(() => {
    table.setPageSize(12)
  }, [])

  return (
    <>
      <Header />
      <main className='flex'>
        <MobileSidebar
          setColumnFilters={setColumnFilters}
          setGlobalFilter={setGlobalFilter}
          isMobileSidebarOpen={isMobileSidebarOpen}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
          columnFilters={columnFilters}
          globalFilter={globalFilter}
          table={table}
        />
        <div className='md:block hidden basis-1/4'>
          <Sidebar globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} table={table} columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
        </div>
        <div className='flex-1 overflow-x-auto'>
          <UserTable
            isLoading={isLoading}
            table={table}
            isError={isError}
          />
        </div>
      </main>
    </>
  )
}

export default App
