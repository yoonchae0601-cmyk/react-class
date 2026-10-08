import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import UserList from './UserList.jsx'
import PointForm from './PointForm.jsx'
import PointHistory from './PointHistory.jsx'

function App() {
    const navigate = useNavigate()

    const [users, setUsers] = useState([
        { id: 1, name: '홍길동', point: 8500 },
        { id: 2, name: '김철수', point: 12000 },
        { id: 3, name: '이영희', point: 5500 }
    ])

    const [history, setHistory] = useState([])
    const [showGraph, setShowGraph] = useState(false)
    const [selectedId, setSelectedId] = useState('1')
    const [pointType, setPointType] = useState('add')
    const [amount, setAmount] = useState('')
    const [message, setMessage] = useState('')

    const isLogin = localStorage.getItem('isLogin')
    const role = localStorage.getItem('role')

    if (isLogin !== 'true' || role !== 'admin') {
        return <Navigate to="/" replace />
    }

    const points = users.map((user) => user.point)
    const maxPoint = Math.max(Math.max.apply(null, points), 1)

    const handlePointUpdate = () => {
        const pointValue = Number(amount)
        const userId = Number(selectedId)

        if (amount === '' || pointValue <= 0) {
            setMessage('1 이상의 포인트를 입력하세요.')
            return
        }

        const selectedUser = users.find(
            (user) => user.id === userId
        )

        if (!selectedUser) {
            setMessage('사용자를 찾을 수 없습니다.')
            return
        }

        if (
            pointType === 'subtract' &&
            pointValue > selectedUser.point
        ) {
            setMessage('현재 보유 포인트보다 많이 차감할 수 없습니다.')
            return
        }

        const updatedUsers = users.map((user) => {
            if (user.id !== userId) {
                return user
            }

            let newPoint

            if (pointType === 'add') {
                newPoint = user.point + pointValue
            } else {
                newPoint = user.point - pointValue
            }

            return Object.assign(
                {},
                user,
                { point: newPoint }
            )
        })

        setUsers(updatedUsers)

        const newHistory = {
            id: Date.now(),
            name: selectedUser.name,
            type: pointType,
            point: pointValue
        }

        setHistory((prev) => [newHistory, ...prev])

        setMessage('포인트가 정상적으로 반영되었습니다.')
        setAmount('')
    }

    const handleLogout = () => {
        localStorage.removeItem('isLogin')
        localStorage.removeItem('role')
        navigate('/')
    }

    return (
        <main className="admin-page">
            <h1>관리자 포인트 관리</h1>

            <PointForm
                users={users}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                pointType={pointType}
                setPointType={setPointType}
                amount={amount}
                setAmount={setAmount}
                onSubmit={handlePointUpdate}
                message={message}
            />

            <UserList users={users} />

            <PointHistory history={history} />

            <div className="button-area">
                <button
                    onClick={() => setShowGraph(!showGraph)}
                >
                    {showGraph ? '그래프 닫기' : '그래프 보기'}
                </button>

                <button onClick={handleLogout}>
                    로그아웃
                </button>
            </div>

            {showGraph && (
                <section className="graph-area">
                    <h2>사용자별 포인트 그래프</h2>

                    {users.map((user) => (
                        <div
                            className="graph-row"
                            key={user.id}
                        >
                            <span className="graph-name">
                                {user.name}
                            </span>

                            <div className="graph-background">
                                <div
                                    className="graph-bar"
                                    style={{
                                        width: `${(user.point / maxPoint) * 100}%`
                                    }}
                                ></div>
                            </div>

                            <strong>
                                {user.point.toLocaleString()} P
                            </strong>
                        </div>
                    ))}
                </section>
            )}
        </main>
    )
}

export default App