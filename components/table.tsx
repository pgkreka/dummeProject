import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TableCell from '@mui/material/TableCell';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import ReactPaginate from "react-paginate";
import { userAPI } from "../apis/UserAPI"
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const VISIBLE_FIELDS = ['name', 'surname', 'username', 'email'];

const Users = () => {   
  const [userList, setUserList] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  let limit = 4;

  useEffect(() => {
    getUserWithFetch();
  }, []);

  const responseUserAPI = userAPI.getAll().then((userList) => {
    const responseUserAPI = userList;
    return responseUserAPI
  });

  const responseUserPageAPI = userAPI.getPage().then((userList) => {
    const responseUserPageAPI = userList;
    return responseUserPageAPI
  });

  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  useEffect(() => {
    const getUsersPage = async () => {
    var result: any = [];

    for(var i in (await responseUserAPI).items) {
      result.push((await responseUserAPI).items[i]);
    }
    const total = (await responseUserAPI).total;
    setpageCount(Math.ceil(total / limit));
    setUserList(result);
  };

    getUsersPage();
  }, [limit]);

  const getUserWithFetch = async () => {
    var result: any = [];

    for(var i in (await responseUserAPI).items) {
      result.push((await responseUserAPI).items[i]);
    }
    setUserList(result);
  };
  
  const paginatedUsers = async (currentPage: any) => {
    currentPage = (await responseUserPageAPI).page;
    var result: any = [];

    for(var i in (await responseUserPageAPI).items) {
      result.push((await responseUserPageAPI).items[i]);
    }
    return result;
  };

  const handlePageClick = async (responseUserPageAPI: any) => {
    let currentPage = responseUserPageAPI.selected;

    const commentsFormServer: any = await paginatedUsers(currentPage);

    setUserList(commentsFormServer);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Get Users</h2>
      </header>
      <Container className="container">
        <Table className="table table-striped table-bordered">
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid {...data} />
          </div>
            <TableHead className="row-header">
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Surname</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="left">Email</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user: any) => (
                <>
                  <TableRow key={user.id} className="row-data">
                    <TableCell align="left" className="row-item">{user.name}</TableCell>
                    <TableCell align="left" className="row-item">{user.surname}</TableCell>
                    <TableCell align="left" className="row-item">{user.username}</TableCell>
                    <TableCell align="left" className="row-item">{user.email}</TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
        </Table>
      </Container>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );

};
export default Users;