import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Modal from './Modal'; 
import AddUserForm from './AddUserForm'; 
import UpdateUserForm from './UpdateUserForm'; // Import UpdateUserForm
import { columns as columnDefs } from './collum'; // Import columns

interface userTable {
    id: string;
    name: string;
    email: string;
    roles: string | null;
}

interface DataTableProps<TData extends userTable, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData extends userTable, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [isAddModalVisible, setAddModalVisible] = React.useState(false);
    const [isUpdateModalVisible, setUpdateModalVisible] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState<userTable | null>(null);
    const [tableData, setTableData] = React.useState(data); // State for table data

    const handleAddUser = () => {
        console.log('User added.');
        setAddModalVisible(false);
    };

    const handleCancelAdd = () => {
        setAddModalVisible(false);
    };

    const handleUpdateUser = (updatedUser: userTable) => {
        console.log('User updated', updatedUser);
        setUpdateModalVisible(false);
        // Lakukan logika update data di sini
    };

    const handleCancelUpdate = () => {
        setUpdateModalVisible(false);
    };

    const openUpdateModal = (user: userTable) => {
        setSelectedUser(user);
        setUpdateModalVisible(true);
    };

    const table = useReactTable({
        data: tableData, // Use tableData state
        columns: columnDefs,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        },
        meta: {
            openUpdateModal, // Pastikan fungsi ini ada di meta
            setTableData // Pastikan setTableData juga ada di meta
        },
    });
    

    return (
        <div className="rounded-md border px-5">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
                    className="max-w-sm mr-auto"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="default" onClick={() => setAddModalVisible(true)} className="ml-5">
                    Add New User
                </Button>
            </div>
            <Modal isVisible={isAddModalVisible} title="Add New User" onClose={handleCancelAdd}>
                <AddUserForm onSubmit={handleAddUser} onCancel={handleCancelAdd} />
            </Modal>
            <Table className="border">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
            {selectedUser && (
                <Modal isVisible={isUpdateModalVisible} title="Update User" onClose={handleCancelUpdate}>
                    <UpdateUserForm user={selectedUser} onSubmit={handleUpdateUser} onCancel={handleCancelUpdate} />
                </Modal>
            )}
        </div>
    );
}

export default DataTable;
