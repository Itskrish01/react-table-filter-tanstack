import { Table } from "@tanstack/react-table";
import { Slider } from "../components/ui/slider";
import { AxiosError } from "axios";

export type User = {
  id: number;
  name: string;
  age: number;
  last_visit: string;
  likes: number;
  status: "active" | "pending";
};

export interface UserTableProps {
  isLoading?: boolean;
  table: Table<any>;
  isError?: boolean;
}

export type TableContextType = {
  selectedStatus: any;
  setSelectedStatus: React.Dispatch<React.SetStateAction<any>> | null;
  selectedAge: any;
  setSelectedAge: React.Dispatch<React.SetStateAction<any>> | null;
  selectedDate: any;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>> | null;
  likes: number[];
  setLikes: React.Dispatch<React.SetStateAction<number[]>> | null;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TableContextProviderProps = {
  children: React.ReactNode;
};

export type SliderProps = React.ComponentProps<typeof Slider>;

export interface ByStatusProps {
  column: {
    setFilterValue: (value: string[] | null) => void;
  };
}
