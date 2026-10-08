import { useNavigate } from 'react-router-dom'
import './Grade.css'

function Grade() {
  const navigate = useNavigate()

  const name = '노윤채'
  const studentId = '20250609'
  const department = '멀티미디어 학과'

  return (
    <main className="grade-page">
      <section className="grade-card">

        <p className="grade-label">MY GRADE</p>

        <h1>개인 성적 조회</h1>

        <div className="student-info">
          <p>이름:</p>
          <strong>{name}</strong>

          <p>학번:</p>
          <strong>{studentId}</strong>

          <p>학과:</p>
          <strong>{department}</strong>
        </div>

        <div className="divider"></div>

        <h2>수강 과목 성적</h2>

        <div className="subject-list">

          <div className="subject">
            <p>프론트엔드프로그래밍:</p>
            <strong>A+</strong>
          </div>

          <div className="subject">
            <p>영상미디어기초:</p>
            <strong>A</strong>
          </div>

        </div>

        <div className="gpa-box">
          <p>평균 평점:</p>
          <strong>4.0</strong>
        </div>

        <button onClick={() => navigate('/')}>
          홈으로
        </button>

      </section>
    </main>
  )
}

export default Grade