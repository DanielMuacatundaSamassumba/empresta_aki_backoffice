import { UseDarkMode } from '@/context/ThemeProvider';
import LoaderComponent from '@/shered-elements/utils/LoaderComponent';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { ArrowDown, ArrowUp } from 'lucide-react';import useBanks from '../services/useBanks';
import { handleBankStatus, StatusBankEnum, type dataBanksTypes } from '../types/dataBanksTypes';
import useDeleteBank from '../services/useDeleteBank';

export default function TableBanks() {
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5);
    const [filteRedData, setFilteredData] = useState<dataBanksTypes[] | undefined>();
    const [statusFilter, setStatusFilter] = useState('');
    const [sortField, setSortField] = useState<'name' >('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [nameFieldControl, setNameFieldControl] = useState(true)
    const { darkMode = false } = UseDarkMode() ?? {};
    const navigate = useNavigate();
    const { handleDeleteBank }= useDeleteBank()
    const { dataOfBanks, loaderControl } = useBanks()
    const handleSearchByBI = (e: any) => {
        const newdata = dataOfBanks && dataOfBanks.filter(item => {
            return (item.bank_name).toLowerCase().includes(e.target.value.toLowerCase());
        })
        if (e.target.value === '') {
            const currentData = dataOfBanks && dataOfBanks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
            setFilteredData(currentData);
            return;
        }
        const currentData = newdata && newdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        setFilteredData(currentData);
    }
    const pageData = useMemo(() => {
        let filtered: dataBanksTypes[] = [];

        if (dataOfBanks) {
            filtered = [...dataOfBanks];
            setSortField("name")
        }

        if (statusFilter !== '') {
            filtered = filtered.filter(
                r => handleBankStatus(r.statu?.name as StatusBankEnum).statusName === statusFilter
            );
        }

        filtered.sort((a: any, b: any) => {
            if (sortField === "name") {
                return sortOrder === "asc"
                    ? a.bank_name.localeCompare(b.bank_name)
                    : b.bank_name.localeCompare(a.bank_name);
            }
        })
        const currentData = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        setFilteredData(currentData);
    }, [dataOfBanks, statusFilter, sortField, sortOrder, page, rowsPerPage]);

    const totalPages = dataOfBanks && Math.ceil(
        dataOfBanks.filter(r =>
            statusFilter === '' ||
            handleBankStatus(r.statu?.name as StatusBankEnum).statusName === statusFilter
        ).length / rowsPerPage
    );
    
    const handleSort = (field: typeof sortField) => {
        const isAsc = sortField === field && sortOrder === "asc";
        if (field == "name") {
            setNameFieldControl(!nameFieldControl)
        }
        setSortOrder(isAsc ? "desc" : "asc");
        console.log(pageData)
    };


    return (
        <Paper sx={{ minWidth: 50 }} >
            <TableContainer component={Paper} sx={{ backgroundColor: darkMode ? '#18181b' : '#fff' }}>
                <div className="flex flex-col sm:flex-row justify-between gap-3 p-3 ">
                    <select
           
                        className="border border-zinc-300 rounded p-2 text-sm dark:text-white dark:bg-zinc-800"
                        value={statusFilter}
                        onChange={e => { setStatusFilter(e.target.value); setPage(0); }}
                    >
                        <option value="">Todos os Status</option>
                        <option value="activo">Activo</option>
                        <option value="desactivado">Desactivado</option>

                    </select>

                    <div className="flex gap-2 items-center">
                        <div>
                            <input
                                type="text"
                                className='border p-2 rounded border-zinc-300 outline-none'
                                placeholder='Pesquisar Por Nome'
                                onChange={handleSearchByBI}
                            />
                        </div>
                          <div>
                          <button className='border p-2 rounded bg-green cursor-pointer text-white border-zinc-300 outline-none' onClick={()=>navigate("create")}>Adicionar</button>
                          </div>
                    </div>
                </div>

                <Table aria-label="credit-requests">
                    <TableHead>
                        <TableRow>

                            <TableCell align="center">Linha</TableCell>
                            <TableCell align="center" onClick={()=>handleSort("name")}>
                            <div className="flex justify-center items-center gap-1 cursor-pointer group">
                                    Nome 
                                    {nameFieldControl ? (
                                        <div className="transition ease-in duration-500 ">
                                            <ArrowUp className='text-zinc-500' />
                                        </div>
                                    ) : (
                                        <div className="transition ease-in duration-500 ">
                                            <ArrowDown className='text-zinc-500' />
                                        </div>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell align="center">Prefixo do Banco</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Acção</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteRedData && filteRedData.map((row, i) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{i + 1}</TableCell>

                                <TableCell align="center">{row.bank_name}</TableCell>
                                <TableCell align="center">{row.bank_prefix}</TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        color: row.statu  ?  handleBankStatus(  row.statu.name as StatusBankEnum).color:"",
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {row.statu && handleBankStatus(row.statu.name  as StatusBankEnum).statusName}
                                </TableCell>

                                <TableCell align="center">
                                 <div>
                                     <button className='bg-green-700 text-white p-2 rounded cursor-pointer' onClick={()=>navigate("update",{
                                         state:{ data:row}
                                     })}>Actualizar</button>
                                     <button className='bg-red text-white p-2 rounded ml-4 cursor-pointer'
                                     onClick={()=>row.id && handleDeleteBank(row.id)}>Eliminar</button>
                                 </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex justify-end p-2 border-t">
                    <button
                        className="border p-1 rounded border-zinc-400 text-zinc-600 dark:text-white"
                        disabled={page === 0}
                        onClick={() => setPage(p => p - 1)}
                    >
                        Anterior
                    </button>

                    <div className='flex items-center ml-4'>
                        <input type="text"
                            value={page + 1}
                            disabled className=' p-2 w-10 rounded border border-zinc-300 text-center'
                        />
                    </div>
                    <button
                        className="border p-1 ml-4 rounded border-zinc-400 text-zinc-600 dark:text-white"
                        disabled={!totalPages || page + 1 >= totalPages}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Próximo
                    </button>
                </div>
            </TableContainer>

            {loaderControl && <LoaderComponent />}
        </Paper>
    );
}
