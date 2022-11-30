import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import groupApi from '../../api/groupAPI'
import { useDispatch } from "react-redux";
import { loginSucess } from "../../store/auth";

function Invitation() {
  const params = useParams('id')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const joinGroup = async () => {
      try {
        const res = await groupApi.acceptInvitaion(params)
        console.log(res)
        if (res.groupId) {
          navigate(`/groups/${res.groupId}`);
        }
        else {
          navigate(`/groups`);
        }
      } catch (error) {
        dispatch(loginSucess(null));
        navigate('/login')
        console.log(error)
      }
    }
    joinGroup()
  }, [])

  return (
    <div>Invitation</div>
  )
}

export default Invitation
