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
import useListCredit from '../services/useListCredit';
import { handleStatus, StatusEnum, type CreditRequestDataType } from '../types/CreditRequestDataType';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { typeOfUser } from '@/shered-elements/types/TypesOfUser';

export default function TableCreditRequest() {
    const dataUserInLocalStorage = localStorage.getItem("dataUser");
    const dataUser = JSON.stringify(dataUserInLocalStorage);
    const user = JSON.parse(dataUser);
    const role = JSON.parse(user).roles[0]
    const { data, loaderControl } = useListCredit();
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5);
    const [filteRedData, setFilteredData] = useState<CreditRequestDataType[]>();
    const [statusFilter, setStatusFilter] = useState('');
    const [sortField, setSortField] = useState<'name' | 'plan' | 'ammount'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [ammountFieldControl, setAmmountFieldControl] = useState(true)
    const [nameFieldControl, setNameFieldControl] = useState(true)
    const [planNameFieldControl, setPlanNameFieldControl] = useState(true)
    const { darkMode = false } = UseDarkMode() ?? {};
    const navigate = useNavigate();

    const handleSearchByBI = (e: any) => {
        const newdata = data.filter(item => {
            return item.customer.bi_number
                && item.customer.bi_number.toLowerCase().
                    includes(e.target.value.toLowerCase());
        })
        if (e.target.value === '') {
            setFilteredData(data);
            return;
        }
        setFilteredData(newdata);
    }
    const pageData = useMemo(() => {
        let filtered = [...data];

        if (statusFilter !== '') {
            filtered = filtered.filter(
                r => handleStatus(r.statu?.name as StatusEnum).statusName === statusFilter
            );
        }

        filtered.sort((a, b) => {
            if (sortField === "name") {
                return sortOrder === "asc"
                    ? a.customer.name.localeCompare(b.customer.name)
                    : b.customer.name.localeCompare(a.customer.name);
            } else if (sortField == "plan") {
                return sortOrder === "asc"
                    ? a.plan[0].flat_name.localeCompare(b.plan[0].flat_name)
                    : b.plan[0].flat_name.localeCompare(a.plan[0].flat_name);
            } else if (sortField === "ammount") {
                const aCap = Number(a.ammount);
                const bCap = Number(b.ammount);

                return sortOrder === "asc"
                    ? aCap - bCap
                    : bCap - aCap;
            }
            return 0;
        });

        const currentData = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        setFilteredData(currentData);
    }, [data, statusFilter, sortField, sortOrder, page, rowsPerPage]);
    console.log(pageData)
    const totalPages = Math.ceil(
        data.filter(r =>
            statusFilter === '' ||
            handleStatus(r.statu?.name as StatusEnum).statusName === statusFilter
        ).length / rowsPerPage
    );
    const handleSort = (field: typeof sortField) => {
        const isAsc = sortField === field && sortOrder === "asc";
        if (field == "name") {
            setNameFieldControl(!nameFieldControl)
        } else if (field == "plan") {
            setPlanNameFieldControl(!planNameFieldControl)
        } else field == "ammount"
        setAmmountFieldControl(!ammountFieldControl)
        setSortField(field);
        setSortOrder(isAsc ? "desc" : "asc");
    };

    return (
        <Paper sx={{ minWidth: 850 }}>
            <TableContainer component={Paper} sx={{ backgroundColor: darkMode ? '#18181b' : '#fff' }}>
                <div className="flex flex-col sm:flex-row justify-between gap-3 p-3 ">
                    <select
                        className="border border-zinc-300 rounded p-2 text-sm dark:text-white dark:bg-zinc-800"
                        value={statusFilter}
                        onChange={e => { setStatusFilter(e.target.value); setPage(0); }}
                    >
                        {
                            role == typeOfUser.SUPER_ADMIN || role == typeOfUser.ADMIN ?
                                (
                                    <div>
                                        <option value="">Todos os Status</option>
                                        <option value="Aprovado">Validado</option>
                                        <option value="Em analise">Em Analise</option>
                                        <option value="Pendente">Pendente</option>
                                        <option value="Näo Validado">Näo Validado</option>
                                        <option value="Processado">Processado</option>
                                    </div>
                                ) : role == typeOfUser.CREDIT_ANALIST ? (
                                    <div>
                                        <option value="">Todos os Status</option>
                                        <option value="Aprovado">Validado</option>
                                        <option value="Em analise">Em Analise</option>
                                        <option value="Pendente">Pendente</option>
                                        <option value="Näo Validado">Näo Validado</option>
                                    </div>
                                ) : (
                                    <div>
                                        <option value="">Todos os Status</option>
                                        <option value="Processado">Processado</option>
                                    </div>
                                )
                        }
                    </select>

                    <div className="flex gap-2 items-center">
                        <div>
                            <input
                                type="text"
                                className='border p-2 rounded border-zinc-300 outline-none'
                                placeholder='Pesquisar Por B.I'
                                onChange={handleSearchByBI}
                            />
                        </div>
                    </div>
                </div>

                <Table aria-label="credit-requests">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Linha</TableCell>
                            <TableCell align="center">ID do Crédito</TableCell>
                            <TableCell align="center" onClick={() => handleSort("name")}>
                                <div className="flex justify-center items-center gap-1 cursor-pointer group">
                                    Nome do usuário
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
                            <TableCell align="center" onClick={() => handleSort("plan")}>
                                <div className="flex justify-center items-center gap-1 cursor-pointer group">
                                    Nome do Plano
                                    {planNameFieldControl ? (
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

                            <TableCell align="center" onClick={() => handleSort("ammount")}>
                                <div className="flex justify-center items-center gap-1 cursor-pointer group">
                                    Montante Solicitado
                                    {ammountFieldControl ? (
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
                            <TableCell align="center" onClick={() => handleSort("ammount")}>
                                <div className="flex justify-center items-center gap-1 cursor-pointer group">
                                    Valor líquido a receber
                                    {ammountFieldControl ? (
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
                            <TableCell align="center">Montante de Reembolso</TableCell>
                            <TableCell align="center">Data do Pedido</TableCell>
                            <TableCell align="center">Data de Validação</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Acção</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteRedData && filteRedData.map((row, i) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{i + 1}</TableCell>
                                <TableCell align="center">2025-034</TableCell>
                                <TableCell align="center">{row?.customer.name}</TableCell>
                                <TableCell align="center">{row?.plan[0].flat_name}</TableCell>
                                <TableCell align="center">
                                    {
                                        row?.ammount
                                            ? new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                .format(Number(row.ammount))
                                            : 'Valor inválido'
                                    }
                                </TableCell>
                                <TableCell align="center">
                                    {
                                        row?.netAmountReceivable
                                            ? new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                .format(Number(row.netAmountReceivable))
                                            : 'Valor inválido'
                                    }
                                </TableCell>
                                <TableCell align="center">

                                    {
                                        row?.totalEffectiveCost
                                            ? new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' })
                                                .format(row.totalEffectiveCost)
                                            : 'Valor inválido'
                                    }
                                </TableCell>

                                <TableCell align="center">{row.created_at.split('T')[0]}</TableCell>
                                <TableCell align="center">
                                    {row.validated_at ? row.validated_at : 'N/A'}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        color: handleStatus(row.statu?.name as StatusEnum).color,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {handleStatus(row.statu?.name as StatusEnum).statusName}
                                </TableCell>

                                <TableCell align="center">
                                    <button
                                        className="text-white bg-green p-3 rounded ml-4"
                                        onClick={() => navigate('personal', { state: { data: row } })}
                                    >
                                        Saber Mais
                                    </button>
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
                        disabled={page + 1 >= totalPages}
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
