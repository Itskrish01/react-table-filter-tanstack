import { useEffect } from "react"
import { useTableContext } from "../../Context/TableContext"
import { X } from "lucide-react"
import { Slider } from "../ui/slider"

const LikesSlider = ({ column }) => {
    const { likes, setLikes } = useTableContext()

    const handleClearFilter = () => {
        column.setFilterValue(null)
        setLikes([0])
    }

    const columnFilterValue = column.getFilterValue()

    useEffect(() => {
        if (likes[0] !== 0) {
            if (likes[0] !== 0) {
                column.setFilterValue(() => [1, likes[0]])
            }
            else {
                column.setFilterValue(() => [1, 1000])
            }
        }
    }, [likes]);


    return (
        <div className="mt-5 ">
            <div className="flex items-center gap-2">
                <h6 className="text-base font-semibold">By Likes</h6>
                {columnFilterValue && <X size={15} className="text-red-500 cursor-pointer" onClick={handleClearFilter} />}
            </div>
            <div className="mt-4">
                <Slider
                    value={likes}
                    max={1000}
                    step={1}
                    onValueChange={(value) => setLikes(value)}
                />
                <div className="mt-4">
                    {likes}
                </div>
            </div>
        </div>
    )
}

export default LikesSlider