import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { X } from 'lucide-react'


const MobileSidebar = ({ isMobileSidebarOpen, setIsMobileSidebarOpen, globalFilter, setGlobalFilter, table, columnFilters, setColumnFilters }) => {
    return (
        <AnimatePresence>
            {isMobileSidebarOpen &&
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "tween" }}
                        onClick={() => setIsMobileSidebarOpen(false)}
                        className="bg-black md:hidden flex opacity-30 fixed top-0 z-[1] left-0 right-0 bottom-0 w-full"
                    ></motion.div>
                    <motion.div
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ type: "tween", ease: [0.9, 0.1, 0.4, 1] }}
                        className="min-h-screen md:hidden fixed top-0 z-[2] left-0 flex-row bg-gray-100"
                    >
                        <div className='md:hidden block basis-1/4 h-full bg-white'>
                            {/* <X className='relative left-60' onClick={() => setIsMobileSidebarOpen(false)} /> */}
                            <Sidebar globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} table={table} columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
                        </div>
                    </motion.div>
                </>
            }
        </AnimatePresence>
    )
}

export default MobileSidebar