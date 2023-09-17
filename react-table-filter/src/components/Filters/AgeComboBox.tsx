import { X } from 'lucide-react';
import { useEffect } from 'react'
import { useTableContext } from '../../Context/TableContext';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';


const AgeComboBox = ({ column }) => {
    const { selectedAge, setSelectedAge } = useTableContext()

    const handleAgeChange = (value: string) => {
        setSelectedAge(value);
    };

    useEffect(() => {
        if (selectedAge) {
            if (selectedAge < 60) {
                column.setFilterValue(() => [Number(selectedAge), Number(selectedAge) + 9])
            } else {
                column.setFilterValue(() => [60, 100])
            }
        }
    }, [selectedAge, column]);

    const handleClearFilter = () => {
        column.setFilterValue(null)
        setSelectedAge(undefined)
    }
    return (
        <div className={`border rounded-lg p-3 transition-all duration-200 ${selectedAge ? 'border-indigo-500' : "border-gray-300"}`}>
            <div className="flex items-center gap-2  ">
                <h6 className="text-base font-semibold">By Age</h6>
                {selectedAge && <X size={15} className="text-red-500 cursor-pointer" onClick={handleClearFilter} />}
            </div>
            <div className='mt-2  '>
                <Select onValueChange={handleAgeChange} value={selectedAge}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Age groups</SelectLabel>
                            <SelectItem value="20">20s</SelectItem>
                            <SelectItem value="30">30s</SelectItem>
                            <SelectItem value="40">40s</SelectItem>
                            <SelectItem value="50">50s</SelectItem>
                            <SelectItem value="60">60s and more</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default AgeComboBox