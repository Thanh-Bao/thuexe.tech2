import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getUsers } from '@/api/user';
import moment from 'moment-timezone';


const UserTable = () => {
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        getUsers().then(users => {
            console.log(users);
            setTableData(users)
        })
    }, [])
    return (
        <TableContainer sx={{margin: 'auto'}} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Create at</TableCell>
                <TableCell align="center">Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow
                  key={row.username}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.username}</TableCell>
                  <TableCell align="center">{row.name||'null'}</TableCell>
                  <TableCell align="center">{row.phone||'null'}</TableCell>
                  <TableCell align="center">{moment.unix(row.createdAt).format('HH:mm DD-MM-YYYY')}</TableCell>
                  <TableCell align="center">{row.active?'True':'False'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default UserTable;