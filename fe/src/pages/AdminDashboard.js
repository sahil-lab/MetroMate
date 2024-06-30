// frontend/src/pages/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Select, MenuItem } from '@mui/material';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/users');
            setUsers(res.data);
        } catch (err) {
            console.error('Error fetching users:', err.message || err);
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
    };

    const handleSaveUser = async () => {
        try {
            await axios.put(`http://localhost:5000/api/admin/users/${editingUser._id}`, editingUser);
            setEditingUser(null);
            fetchUsers();
        } catch (err) {
            console.error('Error saving user:', err.message || err);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/users/${userId}`);
            fetchUsers();
        } catch (err) {
            console.error('Error deleting user:', err.message || err);
        }
    };

    const handleRoleChange = async (userId, role) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/users/${userId}/role`, { role });
            fetchUsers();
        } catch (err) {
            console.error('Error changing role:', err.message || err);
        }
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
            <Box mb={2}>
                <TextField 
                    label="Search Users" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    fullWidth 
                />
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredUsers.map(user => (
                        <TableRow key={user._id}>
                            <TableCell>
                                {editingUser && editingUser._id === user._id ? (
                                    <TextField 
                                        value={editingUser.name} 
                                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} 
                                    />
                                ) : (
                                    user.name
                                )}
                            </TableCell>
                            <TableCell>
                                {editingUser && editingUser._id === user._id ? (
                                    <TextField 
                                        value={editingUser.email} 
                                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} 
                                    />
                                ) : (
                                    user.email
                                )}
                            </TableCell>
                            <TableCell>
                                {editingUser && editingUser._id === user._id ? (
                                    <TextField 
                                        value={editingUser.phoneNumber} 
                                        onChange={(e) => setEditingUser({ ...editingUser, phoneNumber: e.target.value })} 
                                    />
                                ) : (
                                    user.phoneNumber
                                )}
                            </TableCell>
                            <TableCell>
                                <Select
                                    value={user.isAdmin ? 'admin' : user.isServiceProvider ? 'service_provider' : 'user'}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                >
                                    <MenuItem value="user">User</MenuItem>
                                    <MenuItem value="service_provider">Service Provider</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>
                            </TableCell>
                            <TableCell>
                                {editingUser && editingUser._id === user._id ? (
                                    <>
                                        <Button onClick={handleSaveUser}>Save</Button>
                                        <Button onClick={() => setEditingUser(null)}>Cancel</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={() => handleEditUser(user)}>Edit</Button>
                                        <Button onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default AdminDashboard;
