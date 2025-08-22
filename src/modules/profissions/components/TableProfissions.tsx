import { UseDarkMode } from '@/context/ThemeProvider';
import { deletePlan } from '@/modules/plans/services/DeletePlan';
import LoaderComponent from '@/shered-elements/utils/LoaderComponent';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ArrowDown, ArrowUp } from 'lucide-react';
import  { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useListProfissions from '../services/useListProfissions';
import type { ProfissionsType } from '../types/ProfissionsType';
import useDeleteProfission from '../services/useDeleteProfission';
import { handleStatusUser, statusUsers } from '@/modules/customer/types/CreateClientType';

export default function TableProfissions() {
    const {  loaderControlDelete } = deletePlan()
    const [statusFilter, setStatusFilter] = useState<string>("")
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const { dataListProfissions, loaderControl, pageNumber, setPageNumber } = useListProfissions()
    const [newData, setNewData] = useState<ProfissionsType[]>()
    const themeContext = UseDarkMode()
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>();
    const [sortField, setSortField] = useState<"name" | "price">("name");
    const navegate = useNavigate()
    const [nameFieldControl, setNameFieldControl] = useState(true)
    const [priceFieldControl, setPriceFieldControl] = useState(true)
    const { darkMode } = themeContext || { darkMode: false, setDarkMode: () => { } }
    const totalPage: any = dataListProfissions && dataListProfissions.length / rowsPerPage;
    const { deleteProfission } = useDeleteProfission()
    const [filterBy, setFilterBy] = useState({
        typeOfPlan: "",
        value: ""
    })

    const handlaAllTheData = useMemo(() => {
        let filtered = [...(dataListProfissions ?? [])];
console.log(totalPage)
        /*if (statusFilter != "") {
            filtered = filtered.filter(item => {
                return handleStatusPlan(item.status_name as statusOfPlan).status_name == statusFilter
            })
        }*/

        filtered.sort((a, b) => {
            if (sortField === "name") {
                return sortOrder === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            }
            return 0;
        });

        const currentData = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        setNewData(currentData)
    }, [dataListProfissions, page, rowsPerPage, filterBy, statusFilter, sortOrder])

    const handleSearchProfission = (e: any) => {
        const filterClient = dataListProfissions && dataListProfissions.filter(item => {
            return item.name.toLowerCase().includes(e.target.value.toLowerCase())
        })

        const currentData = filterClient && filterClient.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        setNewData(currentData)
        console.log(currentData)
    }

    const handleSort = (field: typeof sortField) => {
        const isAsc = sortField === field && sortOrder === "asc";
        if (field == "name") {
            setNameFieldControl(!nameFieldControl)
        } else {
            setPriceFieldControl(!priceFieldControl)
        }
        setSortField(field);
        setSortOrder(isAsc ? "desc" : "asc");
    };
console.log(handlaAllTheData)
    return (
        <Paper>
            <TableContainer component={Paper} sx={{ backgroundColor: darkMode ? "#18181b" : "#fff", }}>
                <div
                onChange={() => {
                    setRowsPerPage(5)
                    setFilterBy({
                        typeOfPlan: "all",
                        value: ""
                    })
                    setStatusFilter("all")
                    setPage(0)
                 }}
                className=' border-b-1 border-zinc-300 w-full flex flex-col justify-start  xl:flex-row xl:justify-end xl:items-center' >
                    <div className='m-2 flex flex-col  justify-between items-center w-full relative'>
                        <div className='flex justify-between w-full'>
                        </div>
                        <div className='flex  w-full  justify-end mt-4'>
                            <input type="text"
                                className='border border-zinc-300 outline-none p-2 rounded text-[20px] text-font-color dark:text-white'
                                placeholder='pesquisar por nome'
                                onChange={handleSearchProfission}
                            />
                            <div>
                                <button className='bg-green text-white  p-3 ml-2  rounded cursor-pointer' onClick={() => navegate("create")}>Criar </button>
                            </div>

                        </div>

                    </div>
                </div>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead >

                        <TableRow>

                            <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Linha </TableCell>
                            <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }} onClick={() => handleSort("name")}>
                                <div className="flex justify-center items-center gap-1 cursor-pointer group">
                                    Nome da Profissão
                                    {nameFieldControl ? (
                                        <div className="transition ease-in duration-500 ">
                                            <ArrowUp />
                                        </div>
                                    ) : (
                                        <div className="transition ease-in duration-500">
                                            <ArrowDown />
                                        </div>
                                    )}
                                </div>
                            </TableCell>


                            <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Status</TableCell>
                            <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Acção</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ minWidth: "100%" }}>
                        {newData && newData?.map((row: any, i) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>{i + 1}</TableCell>
                                <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>{row.name}</TableCell>
                                <TableCell align="center" sx={{ color: handleStatusUser(row.statu.name as statusUsers).color, fontWeight: "bold" }}>

                                    {
                                        handleStatusUser(row.statu.name as statusUsers).name
                                    }
                                </TableCell>


                                <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>
                                    <div>
                                        <button className='text-white bg-green-700 p-3 rounded cursor-pointer'
                                            onClick={() => navegate("update", { state: { data: row } })}
                                        >
                                            Actualizar
                                        </button>
                                        <button className='text-white bg-red-600 p-3 rounded ml-4 cursor-pointer' onClick={async () => await deleteProfission(row.id || "")}>
                                            Eliminar
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>

                </Table>
                <div className='border-t-1 border-zinc-300 w-full flex justify-end p-1'>
                    <button className='border p-1 rounded border-zinc-400 text-zinc-600 mt-2 text-[21px] cursor-pointer dark:text-white'
                        onClick={() => {
                            ''
                            if (pageNumber > 0) {
                                setPageNumber(pageNumber - 1)
                            }
                        }}
                    >Anterior</button>
                    <button className='border p-2 rounded border-zinc-400 text-zinc-600 mt-2 ml-4 cursor-pointer text-[21px] dark:text-white' onClick={() => {
                        setPageNumber(pageNumber + 1)

                    }}

                    >Proximo</button>
                </div>
            </TableContainer>
            {
                loaderControl && (
                    <LoaderComponent />
                )
            }
            {
                loaderControlDelete && (
                    <LoaderComponent />
                )
            }
        </Paper>

    );
}
