import { useNavigate } from 'react-router-dom'
import './App.css'
import { QRCodeSVG } from 'qrcode.react'

function App() {
  const name = '노윤채'
  const studentId = '학번을 입력하세요'
  const department = '멀티미디어 학과 학생'
  const goal = '사용하기 편하고 보기 좋은 웹 화면 만들기'

  const qrData =
    '이름: ' + name +
    '\n학번: ' + studentId +
    '\n학과: ' + department

  const navigate = useNavigate()

  console.log(qrData)

  return (
    <main className="page">
      <section className="profile-card">

        <span className="status">● LIVE</span>

        <img
          src="/pow.jpg"
          alt="프로필 사진"
          className="avatar-img"
        />

        <p className="eyebrow">HELLO REACT</p>

        <h1>{name}</h1>

        <p className="department">{department}</p>

        <div className="divider"></div>

        <p className="goal">
          목표: {goal}
        </p>

        <div className="tags">
          <span>HTML</span>
          <span>CSS</span>
          <span>JavaScript</span>
        </div>

        {/* 학생용 QR 코드 */}
        <div className="qr-area">
          <QRCodeSVG
            value={qrData}
            size={150}
          />
          <p>학생 QR</p>
        </div>

        {/* 성적 조회 페이지로 이동 */}
        <button onClick={() => navigate('/grade')}>
          성적 보기
        </button>

      </section>
    </main>
  )
}

export default App