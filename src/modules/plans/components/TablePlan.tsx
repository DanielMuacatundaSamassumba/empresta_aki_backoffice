import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UseDarkMode } from '@/context/ThemeProvider';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useListPlans from '../services/useListPlans';
import LoaderComponent from '@/shered-elements/utils/LoaderComponent';
import { deletePlan } from '../services/DeletePlan';
import { handleStatusPlan, statusOfPlan } from '../types/PlanDataType';
import { ArrowDown, ArrowUp } from 'lucide-react';

export default function TablePlan() {
    const { DeletePlan, loaderControlDelete } = deletePlan()
    const [statusFilter, setStatusFilter] = useState<string>("")
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const { dataPlans, loaderControl } = useListPlans()
    const [newData, setNewData] = useState<typeof dataPlans>([])
    const themeContext = UseDarkMode()
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>();
    const [sortField, setSortField] = useState<"name" | "price">("name");
    const navegate = useNavigate()
    const [nameFieldControl, setNameFieldControl] = useState(true)
    const [priceFieldControl, setPriceFieldControl] = useState(true)
    const { darkMode } = themeContext || { darkMode: false, setDarkMode: () => { } }
    const totalPage = dataPlans.length / rowsPerPage;

    const [filterBy, setFilterBy] = useState({
        typeOfPlan: "",
        value: ""
    })

    const handlaAllTheData = useMemo(() => {
        let filtered = [...dataPlans];

        if (statusFilter != "") {
            filtered = filtered.filter(item => {
                return handleStatusPlan(item.status_name as statusOfPlan).status_name == statusFilter
            })
        }

        filtered.sort((a, b) => {
            if (sortField === "name") {
                return sortOrder === "asc"
                    ? a.flat_name.localeCompare(b.flat_name)
                    : b.flat_name.localeCompare(a.flat_name);
            } else if (sortField === "price") {
                const aCap = Number(a.maximum_capital);
                const bCap = Number(b.maximum_capital);

                return sortOrder === "asc"
                    ? aCap - bCap
                    : bCap - aCap;
            }

            return 0;
        });

        const currentData = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        setNewData(currentData)
    }, [dataPlans, page, rowsPerPage, filterBy, statusFilter, sortOrder])
console.log(handlaAllTheData)
    const handleSearchClient = (e: any) => {
        const filterClient = dataPlans.filter(item => {
            return item.flat_name.toLowerCase().includes(e.target.value.toLowerCase())
        })

        const currentData = filterClient.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        setNewData(currentData)
        console.log(currentData)
    }

    const handleSort = (field: typeof sortField) => {
        const isAsc = sortField === field && sortOrder === "asc";
        if (field == "name") {
            setNameFieldControl(!nameFieldControl)
        }else{
            setPriceFieldControl(!priceFieldControl)
        }
        setSortField(field);
        setSortOrder(isAsc ? "desc" : "asc");
    };

    return (
        <Paper>
            <TableContainer component={Paper} sx={{ backgroundColor: darkMode ? "#18181b" : "#fff", }}>
                <div onChange={() => {setRowsPerPage(5)

                    setFilterBy({
                        typeOfPlan: "",
                        value: ""
                    })
                 }} className=' border-b-1 border-zinc-300 w-full flex flex-col justify-start  xl:flex-row xl:justify-end xl:items-center' >
                    <div className='m-2 flex flex-col  justify-between items-center w-full relative'>
                        <div className='flex justify-between w-full'>
                            <div>
                                <select className='border border-zinc-300 outline-none p-2 rounded text-[20px] text-font-color dark:text-white' onChange={(e) => setStatusFilter(e.target.value)}>
                                    <option value="">Todos os Status</option>
                                    <option value="Activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>

                                </select>
                            </div>



                        </div>
                        <div className='flex  w-full  justify-end mt-4'>
                            <input type="text"
                                className='border border-zinc-300 outline-none p-2 rounded text-[20px] text-font-color dark:text-white'
                                placeholder='pesquisar por nome'
                                onChange={handleSearchClient}
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
                                    Nome do Plano
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
                            <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }} onClick={() => handleSort("price")}>
                            <div className="flex justify-center items-center gap-1 cursor-pointer group">
                                   Preço
                                    {priceFieldControl ? (
                                        <div className="transition ease-in duration-500 ">
                                            <ArrowUp />
                                        </div>
                                    ) : (
                                        <div className="transition ease-in duration-500 ">
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
                        {newData?.map((row: any, i) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>{i + 1}</TableCell>
                                <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>{row.flat_name}</TableCell>
                                <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>{row.maximum_capital} AO </TableCell>
                                <TableCell align="center" sx={{ color: row.status_name == "active" ? "green" : "red", fontWeight: "bold" }}>{
                                    row.status_name == "active" ? "activo" : "Inactivo"
                                }</TableCell>
                                <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>
                                    <div>
                                        <button className='text-white bg-green-700 p-3 rounded cursor-pointer'
                                            onClick={() => navegate("update", { state: { data: row } })}
                                        >
                                            Actualizar
                                        </button>
                                        <button className='text-white bg-red-600 p-3 rounded ml-4 cursor-pointer' onClick={async () => await DeletePlan(row.id || "")}>
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
                            if (page > 0) {
                                setPage(page - 1)
                                console.log(totalPage)
                                console.log(page)
                            }
                        }}
                    >Anterior</button>
                    <button className='border p-2 rounded border-zinc-400 text-zinc-600 mt-2 ml-4 cursor-pointer text-[21px] dark:text-white' onClick={() => {
                        console.log(page)
                        if (page + 1 < totalPage) {
                            setPage(page + 1)
                        }
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