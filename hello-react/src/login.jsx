import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Login.css'

function Login() {

    const navigate = useNavigate()

    const dbEmail = 'student@school.ac.kr'
    const dbPassword = '1234'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleLogin = (e) => {

        e.preventDefault()

        console.log('로그인 실행')

        console.log('입력 이메일:', email)
        console.log('DB 이메일:', dbEmail)

        if (email === dbEmail && password === dbPassword) {

            localStorage.setItem('isLogin', 'true')

            console.log('로그인 성공')
            console.log('profile로 이동')

            navigate('/profile')

        } else {

            setMessage(
                '이메일 또는 비밀번호가 올바르지 않습니다.'
            )
        }
    }

    return (
        <main className="login-page">

            <section className="login-card">

                <p className="login-label">
                    STUDENT LOGIN
                </p>

                <h1>
                    로그인
                </h1>

                <p className="login-guide">
                    학교 이메일과 비밀번호를 입력하세요.
                </p>

                <form onSubmit={handleLogin}>

                    <div className="input-group">

                        <label>
                            이메일
                        </label>

                        <input
                            type="email"
                            placeholder="이메일 입력"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>

                    <div className="input-group">

                        <label>
                            비밀번호
                        </label>

                        <input
                            type="password"
                            placeholder="비밀번호 입력"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </div>

                    {message && (
                        <p className="login-message">
                            {message}
                        </p>
                    )}

                    <button type="submit">
                        로그인
                    </button>

                </form>

            </section>

        </main>
    )
}

export default Login