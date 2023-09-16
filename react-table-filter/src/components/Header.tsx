import { Menu, UserCircle2 } from "lucide-react";
import { useTableContext } from "../Context/TableContext";

export default function Header() {
    const { setIsMobileSidebarOpen } = useTableContext()
    return (
        <nav className="flex justify-between px-5 py-2 border-b border-gray-300 items-center">
            <Menu className="cursor-pointer hover:bg-gray-200 p-2 rounded-full transition-all" size={40} onClick={() => setIsMobileSidebarOpen(true)} />
            <UserCircle2 size={40} className="text-gray-500 cursor-pointer" strokeWidth={1} />
        </nav>
    )
}
