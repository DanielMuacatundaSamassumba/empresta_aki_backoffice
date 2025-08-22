import { UseDarkMode } from "@/context/ThemeProvider";
import listClient from "@/modules/customer/services/list-client";
import { handleStatusUser } from "@/modules/customer/types/CreateClientType";
import type { ListUserType } from "@/modules/customer/types/ListUserType";
import LoaderComponent from "@/shered-elements/utils/LoaderComponent";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TableBlog(){
    const { data, loaderControl } = listClient()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [newData, setNewData] = useState<ListUserType[]>([])
  const themeContext = UseDarkMode()
  const navegate = useNavigate()
  const [filteRedData, setFilteredData] = useState<ListUserType[]>();
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState<'name' | 'plan'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { darkMode } = themeContext || { darkMode: false, setDarkMode: () => { } }
console.log(newData, filteRedData, data)
  const totalPage = data.length / rowsPerPage;

  const handleSearchClient = (e: any) => {

    const filterClient = data.filter(item => {
      return item.bi_number.toLowerCase().includes(e.target.value.toLowerCase())
    })
    const currentData = filterClient.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    setNewData(currentData)
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
      const aField = sortField === 'name' ? a.name : a.bi_number;
      const bField = sortField === 'name' ? b.name : b.bi_number;
      return sortOrder === 'asc'
        ? aField.localeCompare(bField)
        : bField.localeCompare(aField);
    });

    setFilteredData(filtered);
  }, [data, statusFilter, sortField, sortOrder, page, rowsPerPage]);

console.log(pageData)

  return (
    <Paper>
      <TableContainer component={Paper} sx={{ backgroundColor: darkMode ? "#18181b" : "#fff", }}>
        <div className="flex flex-col sm:flex-row justify-between gap-3 p-3 " onClick={() => setRowsPerPage(5)}>

          <select
            className="border border-zinc-300 rounded p-2 text-sm dark:text-white dark:bg-zinc-800"
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(0); }}
          >
            <option value="">Todos os Status</option>
            <option value="active">Ativo </option>
            <option value="inactive">Inativo</option>
          </select>

          <div className="flex gap-2 items-center">
            <span className="text-sm dark:text-white">Ordenar por:</span>
            <select
              className="border border-zinc-300  rounded p-2 text-sm dark:text-white dark:bg-zinc-800"
              value={sortField}
              onChange={e => setSortField(e.target.value as 'name' | 'plan')}
            >  <option value="name">Nome do Usuário</option>
              <option value="plan">Nome do Plano</option>

            </select>

            <select
              className="border rounded border-zinc-300  p-2 text-sm dark:text-white dark:bg-zinc-800"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
            >
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>

          </div>
        </div>

        <div className=' border-b-1 border-zinc-300 w-full flex flex-col justify-start  xl:flex-row xl:justify-end xl:items-center' >
          <div className='m-2 flex justify-end'>
            <input type="text"
              className='border border-zinc-300 outline-none p-2 rounded text-[20px] text-font-color dark:text-white'
              placeholder='pesquisar por B.I'
              onChange={handleSearchClient}
            />
            <div>
              <button className='bg-green text-white  p-3 ml-2  rounded cursor-pointer' onClick={() => navegate("create")}>Criar usuario</button>
            </div>
          </div>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >

         
              <TableCell sx={{ color: darkMode ? "#fff" : "#666666", }}>Linha</TableCell>
              <TableCell sx={{ color: darkMode ? "#fff" : "#666666", }}>Foto de Perfil</TableCell>
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Nome</TableCell>
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Número  do B.I</TableCell>
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Plano</TableCell>
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Status</TableCell>
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Acção</TableCell>
          </TableHead>
          <TableBody sx={{ minWidth: "100%" }}>
           

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
              value={page+1}
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
  )
}