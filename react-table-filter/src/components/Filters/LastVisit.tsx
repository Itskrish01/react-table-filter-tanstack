import { useEffect, useMemo } from "react"
import { CalendarIcon, X } from "lucide-react"
import { useTableContext } from "../../Context/TableContext"
import moment from "moment"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "../../lib/lib"
import { Calendar } from "../ui/calendar"

const LastVisit = ({ column }) => {
    const { selectedDate, setSelectedDate } = useTableContext()

    useEffect(() => {
        if (selectedDate) {
            column.setFilterValue(() => moment(selectedDate).format());
        } else {
            column.setFilterValue(undefined)
        }
    }, [selectedDate, column]);

    const handleClearFilter = () => {
        column.setFilterValue(undefined)
        setSelectedDate(undefined)
    }
    return (
        <div className={`border rounded-lg p-3 transition-all duration-200 ${selectedDate ? 'border-indigo-500' : "border-gray-400"}`}>
            <div className="flex items-center gap-2">
                <h6 className="text-base font-semibold">By last visit</h6>
                {selectedDate && <X size={15} className="text-red-500 cursor-pointer" onClick={handleClearFilter} />}
            </div>
            <div className="mt-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !selectedDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? moment(selectedDate).format('MMMM Do YYYY') : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default LastVisit