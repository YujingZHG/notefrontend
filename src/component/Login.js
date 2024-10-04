import React, { useState } from 'react'; 
export default function Login() {
    // 定义状态变量，用于存储用户输入的 email 和 password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState(''); // 存储登录状态消息
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // 存储是否成功登录的状态

    // 处理表单提交事件
    const handleLogin = async (e) => {
        e.preventDefault();

        // 创建用户对象
        const user = { email, password };

        try {
            // 发送 POST 请求到 Spring Boot 后端的 /user/login 路由
            const response = await fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            // 解析响应结果
            const result = await response.json();

            if (result.success) {
                setIsLoggedIn(true);  // 登录成功
                setLoginMessage(result.message); // 设置成功消息
            } else {
                setIsLoggedIn(false); // 登录失败
                setLoginMessage(result.message); // 设置失败消息
            }
        } catch (error) {
            console.error("Login error:", error);
            setIsLoggedIn(false); // 网络错误导致登录失败
            setLoginMessage("Login failed: Network or server issue");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '20px auto', textAlign: 'center' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                <h2>Login</h2>
                {/* 登录表单 */}
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {/* 邮箱输入框 */}
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
                    {/* 密码输入框 */}
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
                    {/* 登录按钮 */}
                    <button type="submit" style={{ padding: '10px', backgroundColor: '#6200ea', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Login
                    </button>
                </form>
                {/* 显示登录状态消息 */}
                {loginMessage && (
                    <p style={{ marginTop: '20px', color: isLoggedIn ? 'green' : 'red' }}>
                        {loginMessage}
                    </p>
                )}
            </div>
        </div>
    );
}