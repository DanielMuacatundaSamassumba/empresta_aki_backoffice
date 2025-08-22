
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ImageUser from "@/assets/image 9.png"
import { UseDarkMode } from '@/context/ThemeProvider';

function createData(
  photo: string,
  name: string,
  amount: string,
  Installments: string,
  phone_number: string

) {
  return { photo, name, amount, Installments, phone_number };
}

const rows = [
  createData(ImageUser, "Valentina Cross", "100.000 AO", "1/2", "999999999"),
  createData(ImageUser, "Valentina Cross", "100.000 AO", "1/2", "999999999"),
  createData(ImageUser, "Valentina Cross", "100.000 AO", "1/2", "999999999"),
  createData(ImageUser, "Valentina Cross", "100.000 AO", "1/2", "999999999"),

];

export default function TableResume() {
  const themeContext = UseDarkMode()

  const { darkMode,  } = themeContext || { darkMode: false, setDarkMode: () => { } }
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: darkMode ? "#18181b" : "#fff", }}>
      <div className=' border-b-1 border-zinc-300 w-full flex flex-col justify-start  xl:flex-row xl:justify-between xl:items-center' >
        <h1 className='text-2xl p-2 text-font-color font-medium text-start dark:text-white'>usuários com pagamento em atraso</h1>
        <div className='p-2 flex justify-start'>
          <input type="text"
            className='border border-zinc-300 outline-none p-2 rounded text-[20px] text-font-color dark:text-white'
            placeholder='Número de telefone'
          />
        </div>
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >

          <TableRow>
            <TableCell sx={{ color: darkMode ? "#fff" : "#666666", }}>Foto de Perfil</TableCell>
            <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Nome</TableCell>
            <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Montante a Reembolsar</TableCell>
            <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Parcelas</TableCell>
            <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Número de Telefone</TableCell>
            <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>Acção</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div className='flex justify-center'>
                  <img src={row.photo}
                    className='w-12'
                  />
                </div>
              </TableCell>
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>{row.name}</TableCell>
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>{row.amount}</TableCell>
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>{row.Installments}</TableCell>
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>{row.phone_number}</TableCell>
              <TableCell align="center" sx={{ color: darkMode ? "#fff" : "#666666", }}>
                <button className='bg-green text-white rounded-sm p-3 cursor-pointer'>Saber Mais</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
      <div className='border-t-1 border-zinc-300 w-full flex justify-end p-1'>
        <button className='border p-1 rounded border-zinc-400 text-zinc-600 mt-2 text-[21px] cursor-pointer dark:text-white'>Anterior</button>
        <button className='border p-2 rounded border-zinc-400 text-zinc-600 mt-2 ml-4 cursor-pointer text-[21px] dark:text-white'>Proximo</button>
      </div>
    </TableContainer>
  );
}