import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ImageUser from "@/assets/avatarIcon.png"
import { UseDarkMode } from '@/context/ThemeProvider';
import listClient from '@/modules/customer/services/list-client';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleStatusUser } from '@/modules/customer/types/CreateClientType';
import { handleTypeOfUser } from '@/modules/customer/types/typeOFUser';
import { handleStatusPlan } from '@/modules/plans/types/PlanDataType';
import LoaderComponent from '@/shered-elements/utils/LoaderComponent';
import type { ListUserType } from '@/modules/customer/types/ListUserType';
import { ArrowDown, ArrowUp } from 'lucide-react';


export default function TableManegers() {
  const { dataOmanegers, loaderControl } = listClient()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const themeContext = UseDarkMode()
  const [nameFieldControl, setNameFieldControl] = useState(true)
  const navegate = useNavigate()
  const [filteRedData, setFilteredData] = useState<ListUserType[]>();
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState<'name' | 'plan' | 'bi_number'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { darkMode, setDarkMode } = themeContext || { darkMode: false, setDarkMode: () => { } }
  const totalPage = dataOmanegers.length / rowsPerPage;

  const handleSearchManeger = (e: any) => {

    const filterClient = dataOmanegers.filter(item => {
      return item.name && item.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    const currentData = filterClient.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    setFilteredData(currentData)
  }
  useEffect(() => {
    const currentData = dataOmanegers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    setFilteredData(currentData)
  }, [dataOmanegers, page])

  const pageData = useMemo(() => {
    let filtered = [...dataOmanegers];

    if (statusFilter !== '') {
      filtered = filtered.filter(
        r => handleStatusUser(r.status.name).nameIngles == statusFilter
      );
      console.log(filtered)
    }

    filtered.sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === "bi_number") {
        sortOrder == "asc"
          ? a.bi_number.localeCompare(b.bi_number)
          : b.bi_number.localeCompare(a.bi_number);
      } else if (sortField === "plan") {
        sortOrder == "asc"
          ? a.name.localeCompare(b.bi_number)
          : b.bi_number.localeCompare(a.bi_number);
      }

      return 0;
    });

    const currentData = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    setFilteredData(currentData);
  }, [dataOmanegers, statusFilter, sortField, sortOrder, page, rowsPerPage]);

  const handleSort = (field: typeof sortField) => {
    const isAsc = sortField === field && sortOrder === "asc";
    if (field == "name") {
      setNameFieldControl(!nameFieldControl)
    }
    setSortField(field);
    setSortOrder(isAsc ? "desc" : "asc");
  };
console.log(pageData)
  return (
    <Paper>
      <TableContainer component={Paper} sx={{ backgroundColor: darkMode ? "#18181b" : "#fff", }}>
        <div className=' border-b-1 border-zinc-300 w-full flex flex-col justify-start  xl:flex-row xl:justify-between xl:items-center' >
          <div className="flex flex-col sm:flex-row justify-between gap-3 p-3 ">
            <select
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-zinc-300 rounded p-2 text-sm dark:text-white dark:bg-zinc-800"
            >
              <option value="">Todos os Status</option>
              <option value="active">Ativo </option>
              <option value="inactive">Inativo</option>
            </select>


          </div>
          <div className='m-2 flex justify-end'>
            <input type="text"
              className='border border-zinc-300 outline-none p-2 rounded text-[20px] text-font-color dark:text-white'
              placeholder='pesquisar por Nome'
              onChange={handleSearchManeger}
            />
            <div onClick={() => {
              setDarkMode(false)
              setRowsPerPage(0)
            }}>
              <button className='bg-green text-white  p-3 ml-2  rounded cursor-pointer' onClick={() => navegate("create")}>Criar usuario</button>
            </div>
          </div>
        </div>
        <Table sx={{ minWidth: 380 }} aria-label="simple table">
          <TableHead >

            <TableRow>
              <TableCell sx={{ color: darkMode ? "#fff" : "#666666", textAlign: "center" }}>Linha</TableCell>
              <TableCell sx={{ color: darkMode ? "#fff" : "#666666", textAlign: "center" }}>Foto de Perfil</TableCell>
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>
              <div className="flex justify-center items-center gap-1 cursor-pointer group" onClick={()=>handleSort("name")}>
                  Nome
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
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Tipo de usuario</TableCell>
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Status</TableCell>
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Acção</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ minWidth: "100%" }}>
            {filteRedData?.map((row: any, i) => (
              <TableRow
                key={row?.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>{i + 1}</TableCell>
                <TableCell component="th" scope="row">
                  <div className='flex justify-center'>
                    <img src={ImageUser}
                      className='w-12'
                    />
                  </div>
                </TableCell>

                <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>{row.name}</TableCell>
                <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>{
                  handleTypeOfUser(row.roles[0]).name
                }</TableCell>
                <TableCell align="center" sx={{ color: darkMode ? "#fff" : handleStatusPlan(row.status.name).color, fontWeight: "bold" }}>
                  {handleStatusPlan(row.status.name).status_name}
                </TableCell>
                <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>
                  <div>
                    <button className='bg-green-800 text-white p-2 rounded cursor-pointer' onClick={() => navegate("update", { state: { data: row } })}>Actualizar</button>
                    <button className='bg-red-600 text-white p-2 rounded ml-3 cursor-pointer'>Eliminar</button>
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
    </Paper>

  );
}