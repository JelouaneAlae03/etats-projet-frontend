import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import './UsersList.css';
import ReactPaginate from 'react-paginate';
import Loading from './Loading';

export const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
    
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; 

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

    const filteredUsers = users.filter(
      (user) =>
        user.Nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.Description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

    const offset = currentPage * itemsPerPage;
    const currentUsers = filteredUsers.slice(offset, offset + itemsPerPage);

    const GetUsersList = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/list',{} , {
                withCredentials: true
            });
            setUsers(response.data);
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(()=>{
        GetUsersList();
    },[])

    useEffect(()=>{
        console.log(users);
    },[users])
    
    if (users.length === 0) {
      return <Loading />;

  }
  return (
    <>

    <div className='SearchInput-Container'>
      <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="SearchInput"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
    </div>

    <table>
        <thead>
            <tr>
                <th>Cle</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Action</th>

            </tr>
        </thead>
        <tbody>
        {currentUsers && currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.Cle}>
                <td>{user.Cle}</td>
                <td>{user.Nom}</td>
                <td>{user.Description}</td>
                <td><a href={`/users/${user.Cle}`}>Plus details</a></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
    </table>
    <div className='pagination-container'>
      <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
    </div>
    </>
  )
}
