import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingComponent from '../../components/Status-components/Loading'
import Error from '../../components/Status-components/Error'

import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import useOutClick from '../../hooks/useOutClick'
import { getEmail, getPassword } from '../../Redux/Auth/Auth-slice'
import { RegistrationThunk } from '../../Redux/Auth/Auth-thunk'

const Registration = () => {
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement | null>(null)
  const navigateOut = () => {
    navigate('/')
  }
  useOutClick(ref, navigateOut)

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const { password, email, error, loading } = useSelector(
    (state: any) => state.AuthSlice,
  )
  const handleRegister = async () => {
    await dispatch(RegistrationThunk({ email, password }))
  }
  return (
    <div className="flex items-center registrationBg     justify-center h-[900px]">
      <div className="flex items-center     justify-center  backdrop-blur-md  bg-gray-300/10   w-[100vw] h-[100%] top-0 left-0">
        <div
          ref={ref}
          className="bg-white p-8 rounded  shadow-md w-full sm:w-96 backdrop-blur-lg"
        >
          <h2 className="text-2xl font-semibold mb-4"> </h2>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2"></label>
              <input
                onChange={(e) => dispatch(getEmail(e.target.value))}
                type="text"
                className="w-full p-2 border rounded shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2"></label>
              <input
                onChange={(e) => dispatch(getEmail(e.target.value))}
                type="email"
                className="w-full p-2 border rounded shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2"></label>
              <input
                onChange={(e) => dispatch(getPassword(e.target.value))}
                type="password"
                className="w-full p-2 border rounded shadow-sm"
              />
            </div>

            <button
              onClick={handleRegister}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              click
            </button>
          </div>
        </div>
      </div>
      <Error error={error} />
      <LoadingComponent loading={loading} />
    </div>
  )
}

export default Registration
