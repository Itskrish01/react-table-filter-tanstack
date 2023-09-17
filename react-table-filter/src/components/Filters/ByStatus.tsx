import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useTableContext } from '../../Context/TableContext';
import { ByStatusProps } from '../../constants/commontypes';

const statusOptions = [
    { id: 'active', label: 'Active' },
    { id: 'pending', label: 'Pending' },
];

const noneStatus = 'none';

const Checkbox = ({ id, label, checked, onChange }) => (
    <div className="checkbox-wrapper-33">
        <label className="checkbox hover:bg-black/10 cursor-pointer rounded p-0.5 px-1">
            <input
                className="checkbox__trigger visuallyhidden"
                id={id}
                type="checkbox"
                onChange={onChange}
                checked={checked}
            />
            <span className="checkbox__symbol">
                <svg
                    aria-hidden="true"
                    className="icon-checkbox"
                    width="28px"
                    height="28px"
                    viewBox="0 0 28 28"
                    version="1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M4 14l8 7L24 7"></path>
                </svg>
            </span>
            <p className="checkbox__textwrapper">{label}</p>
        </label>
    </div>
);

const ByStatus: React.FC<ByStatusProps> = ({ column }) => {
    const { setSelectedStatus, selectedStatus } = useTableContext();

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        const { id, checked } = event.target;
        if (checked) {
            setSelectedStatus((prevSelectedStatus) => [...prevSelectedStatus, id]);
        } else {
            setSelectedStatus((prevSelectedStatus) =>
                prevSelectedStatus.filter((status) => status !== id)
            );
        }
    };

    useEffect(() => {
        if (selectedStatus.length !== 0) {
            column.setFilterValue(selectedStatus);
        } else {
            column.setFilterValue([noneStatus]);
        }
    }, [selectedStatus, column]);

    const handleClearFilter = () => {
        column.setFilterValue([]);
        setSelectedStatus([]);
    };

    return (
        <div className={`border rounded-lg p-3 transition-all duration-200 ${selectedStatus.length !== 0 ? 'border-indigo-500' : "border-gray-400"}`}>
            <div className="flex items-center gap-2">
                <h6 className="text-base font-semibold">By status</h6>
                {selectedStatus.length > 0 && (
                    <X
                        size={15}
                        className="text-red-500 cursor-pointer"
                        onClick={handleClearFilter}
                    />
                )}
            </div>
            <div className="mt-2 space-y-2">
                {statusOptions.map((option) => (
                    <Checkbox
                        key={option.id}
                        id={option.id}
                        label={option.label}
                        checked={selectedStatus.includes(option.id)}
                        onChange={handleCheckboxChange}
                    />
                ))}
            </div>
        </div>
    );
};

export default ByStatus;
