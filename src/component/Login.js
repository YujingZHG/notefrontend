import React, { useEffect, useState } from 'react';

export default function User() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);

    // 处理表单提交
    const handleClick = (e) => {
        e.preventDefault();
        const user = { email, password };
        console.log(user);
        fetch("http://localhost:8080/user/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(() => {
            console.log("New User added");
            fetchUsers(); // 添加用户后重新获取用户列表
        });
    };

    // 获取用户列表
    const fetchUsers = () => {
        fetch("http://localhost:8080/user/getAll")
            .then(res => res.json())
            .then((result) => {
                setUsers(result);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                <h2>Add User</h2>
                <form onSubmit={handleClick} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ padding: '10px', margin: '5px 0', border: '1px solid #ddd', borderRadius: '4px' }}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ padding: '10px', margin: '5px 0', border: '1px solid #ddd', borderRadius: '4px' }}
                            required
                        />
                    </label>
                    <button type="submit" style={{ padding: '10px', backgroundColor: '#6200ea', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Submit
                    </button>
                </form>
            </div>
            <h2 style={{ marginTop: '20px' }}>Users</h2>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                {users.map(user => (
                    <div key={user.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                        <strong>Id:</strong> {user.id}<br />
                        <strong>Email:</strong> {user.email}<br />
                        <strong>Password:</strong> {user.password}
                    </div>
                ))}
            </div>
        </div>
    );
}