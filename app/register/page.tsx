'use client'

import { faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(false)
  const [succ, setSucc] = useState(false)
  const [msg, setMsg] = useState('')


  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  async function doSubmit() {
    if (name === '') {
      setAlert(true)
      setMsg('이름을 입력해 주세요.')
      return;
    }
    if (email === '') {
      setAlert(true)
      setMsg('이메일을 입력해 주세요.')
      return;
    }
    if (!emailPattern.test(email)) {
      setAlert(true)
      setMsg('유효하지 않은 이메일입니다.')
      return;
    }
    if (password === '') {
      setAlert(true)
      setMsg('비밀번호을 입력해 주세요.')
      return;
    }

    const loginData = {
      name: name,
      email: email,
      password: password
    }
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(loginData)
    })

    const result = await res.json();

    if (result.msg == 'success') {
      setSucc(true)
      setMsg('회원가입 되었습니다!')
    }

  }

  return (
    <>
      <div className="header-bannerbar">
        <p>회원가입</p>
      </div>
      <div className="user-register-container">
        <div>
          <p>이름</p>
          <input name="name" type="text" placeholder="이름을 입력해 주세요" value={name} onChange={(e) => { setName(e.target.value) }} />
        </div>
        <div>
          <p>이메일</p>
          <input name="email" type="text" pattern="[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*" placeholder="영문, 숫자, 특수문자" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div>
          <p>비밀번호</p>
          <input name="password" type="password" placeholder="비밀번호를 입력해 주세요" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <button onClick={() => {
          doSubmit()
        }}>가입하기</button>
      </div>
      {
        alert
        &&
        <ErrorAlert msg={msg} setAlert={setAlert} />
      }
      {
        succ
        &&
        <SuccessAlert msg={msg} setSucc={setSucc} />
      }
    </>
  )
}

function ErrorAlert({ msg, setAlert }: { msg: string, setAlert: (alert: boolean) => void }) {
  return (
    <div className="modal-alert">
      <p><FontAwesomeIcon icon={faTriangleExclamation} size="3x" /></p>
      <p>{msg}</p>
      <div>
        <button onClick={() => setAlert(false)}>확인</button>
      </div>
    </div>
  )
}

function SuccessAlert({ msg, setSucc }: { msg: string, setSucc: (alert: boolean) => void }) {
  const router = useRouter()
  return (
    <div className="modal-alert">
      <p><FontAwesomeIcon icon={faCircleCheck} size="3x" color="green" /></p>
      <p>{msg}</p>
      <div>
        <button onClick={() => {
          setSucc(false)
          router.push('/')
        }}>확인</button>
      </div>
    </div>
  )
}