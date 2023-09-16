import { Column } from "@tanstack/react-table"
import ByStatus from "./Filters/ByStatus"
import AgeComboBox from "./Filters/AgeComboBox"
import LastVisit from "./Filters/LastVisit"
import LikesSlider from "./Filters/LikesSlider"

export default function Filter({ column }: { column: Column<any, unknown> }) {
    switch (column.id) {
        case 'status':
            return (
                <div className="mt-6">
                    <ByStatus column={column} />
                    <div className="h-1" />
                </div>
            )

        case 'age':
            return (
                <div className="mt-6">
                    <AgeComboBox column={column} />
                    <div className="h-1" />
                </div>
            )

        case 'last_visit':
            return (
                <div className="mt-6">
                    <LastVisit column={column} />
                    <div className="h-1" />
                </div>
            )

        case 'likes':
            return (
                <div className="mt-6">
                    <LikesSlider column={column} />
                    <div className="h-1" />
                </div>
            )
    }
}