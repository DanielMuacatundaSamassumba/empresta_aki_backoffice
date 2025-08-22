import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UseDarkMode } from '@/context/ThemeProvider';
import listClient from '@/modules/customer/services/list-client';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoaderComponent from '@/shered-elements/utils/LoaderComponent';
import type { ListUserType } from '../types/ListUserType';
import { handleStatusUser, statusUsers } from '../types/CreateClientType';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { images } from '@/shered-elements/constents/Images';

export default function TableCustomer() {
  const { data, loaderControl } = listClient()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [newData, setNewData] = useState<ListUserType[]>([])
  console.log(newData)
  const themeContext = UseDarkMode()
  const navegate = useNavigate()
  const [nameFieldControl, setNameFieldControl] = useState(true)
  const [biFieldControl, setBiFieldControl] = useState(true)
  const [filteRedData, setFilteredData] = useState<ListUserType[]>();
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState<'name' | 'plan' | 'bi_number'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { darkMode } = themeContext || { darkMode: false, setDarkMode: () => { } }
  const totalPage = data.length / rowsPerPage;

  const handleSearchClient = (e: any) => {

    const filterClient = data.filter(item => {
      return item.bi_number && item.bi_number.toLowerCase().includes(e.target.value.toLowerCase())
    })
    const currentData = filterClient.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    setFilteredData(currentData)
  }
  useEffect(() => {
    const currentData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    setFilteredData(currentData)
  }, [data, page])

  const pageData = useMemo(() => {
    let filtered = [...data];

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
  }, [data, statusFilter, sortField, sortOrder, page, rowsPerPage]);
  console.log(pageData)
  const handleSort = (field: typeof sortField) => {
    const isAsc = sortField === field && sortOrder === "asc";
    if (field == "name") {
      setNameFieldControl(!nameFieldControl)
    } else {
      setBiFieldControl(!biFieldControl)
    }
    setSortField(field);
    setSortOrder(isAsc ? "desc" : "asc");
  };
  console.log("filteRedData", filteRedData)
  return (
    <Paper>
      <TableContainer component={Paper} sx={{ backgroundColor: darkMode ? "#18181b" : "#fff", }}>
        <div className="flex flex-col sm:flex-row justify-between gap-3 p-3 " onClick={()=>setNewData([])}>

          <select
            className="border border-zinc-300 rounded p-2 text-sm dark:text-white dark:bg-zinc-800"
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(0); }}
          >
            <option value="">Todos os Status</option>
            <option value="active">Ativo </option>
            <option value="inactive">Inativo</option>
          </select>


        </div>

        <div className=' border-b-1 border-zinc-300 w-full flex flex-col justify-start  xl:flex-row xl:justify-end xl:items-center' >
          <div className='m-2 flex justify-end'>
            <input type="text"
              className='border border-zinc-300 outline-none p-2 rounded text-[20px] text-font-color dark:text-white'
              placeholder='pesquisar por B.I'
              onChange={(event) => handleSearchClient(event)}
            />
            <div>
              <button className='bg-green text-white  p-3 ml-2  rounded cursor-pointer' onClick={() => navegate("create")}>Criar usuario</button>
            </div>
          </div>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >

            <TableRow>
              <TableCell sx={{ color: darkMode ? "#fff" : "#666666", }}>Linha</TableCell>
              <TableCell sx={{ color: darkMode ? "#fff" : "#666666", }}>Foto de Perfil</TableCell>
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }} onClick={() => handleSort("name")}>
                <div className="flex justify-center items-center gap-1 cursor-pointer group">
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
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>
                <div className="flex justify-center items-center gap-1 cursor-pointer group" onClick={() => handleSort("bi_number")}>
                  Número  do B.I
                  {biFieldControl ? (
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
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Plano Activo</TableCell>
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Status</TableCell>
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Acção</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ minWidth: "100%" }}>
            {filteRedData?.map((row, i) => (
              <TableRow
                key={row?.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>{i + 1}</TableCell>
                <TableCell component="th" scope="row">
                  <div className='flex justify-center' onCanPlay={() => setRowsPerPage(0)}>
                    <img
                      src={row.path_profile_photo ? row.path_profile_photo : images.avatarIcon}
                      alt="image-profile-user"
                      className="rounded-full border-2 border-green object-cover
             w-20 h- sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-15 xl:h-15"
                    />
                  </div>
                </TableCell>

                <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>{row.name}</TableCell>
                <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>{row.bi_number}</TableCell>
                <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>{row.creditRequestProcessed ? row.creditRequestProcessed.plan[0].flat_name : "N/A"}</TableCell>
                <TableCell align="center" sx={{ color: handleStatusUser(row.status.name as statusUsers).color, fontWeight: "bold" }}>

                  {
                    handleStatusUser(row.status.name as statusUsers).name
                  }
                </TableCell>
                <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>
                  <button
                    onClick={() => navegate("profile", { state: { data: row } })}
                    className='bg-green text-white rounded-sm p-3 cursor-pointer w-full'>
                    visualizar perfil
                  </button>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>

        </Table>
        <div className='border-t-1 border-zinc-300 w-full flex justify-end p-1 items-center'>
          <button className='border p-1 rounded border-zinc-400 text-zinc-600 mt-2 text-[21px] cursor-pointer dark:text-white'
            onClick={() => {
              if (page > 0) {
                setPage(page - 1)
                console.log(totalPage)
                console.log(page)
              }
            }}
          >Anterior</button>
          <div>
            <input
              type="text"
              className='border outline-none p-3 border-zinc-300 rounded w-10 ml-4'
              value={page + 1}
              disabled
            />
          </div>
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