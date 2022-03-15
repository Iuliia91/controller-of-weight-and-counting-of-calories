import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usersWeigth, amountOfLosedWeigth } from 'store/actions/userAction'
import ButtonOptions from 'Components/ButtonOptions'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import FormikInput from 'Components/formikFields/FormikInput'

import { ModalContext } from 'HOC/GlobalModalProvider'
import ProgressBar from 'Components/ProgressBar/ProgressBar'
import Schedule from 'Components/Schedule/Schedule'
import Server from 'api/server.instance'
import ModalContextElement from 'Components/ModalContext/ModalContext'
const StyledProfil = styled.div`
width:80%;
margin:auto;
aling-item:center;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  
 grid-gap:20px;
  font-family: 'Lucida Sans Unicode', 'Lucida Grande', 
  border: 16px solid #ece9e0;
  padding:10px;
 
  .user_name{
   
    box-shadow: -5px 5px 40px rgba(0, 0, 0, 0.5);
    margin: 0 auto;

background: #ece9e0;
width:80%;
 grid-column: 3/4;
 padding:30px 50px;
 margin:auto;
  border-radius: 20px;
  }
  
  .user_name_text{
  text-align: center;
  }

  .user_weigth_data{
  text-align: center;
  }

  .user_information{
background: #ece9e0;
 grid-column:1/2;
 padding:30px;
 border-radius: 20px;
  }

  .button{
  text-align: center;
    margin-top:20px;
    
  }

  
  button{
    border: none;  
  }

  button:hover{
    background: rgb(199, 211, 222)
  }
  .user_line{
    display:flex;
    
  }

  .user_weigth_data{
    display:flex;
    flex-direction:column;
    justify-content: center;
  }

  .user_weigth_today,.user_weigth-differance{
    text-align: center;
  }

  .user_schedule{
    grid-column:3/4;
    grid-row:3/6
  }


`

const StyledModalProfilForm = styled.div`
  margin-bottom: 50px;
  .close_element {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .button_close {
    border: none;
    background-color: rgb(236, 233, 224);
  }

  header {
    margin: 30px;
    font-size: 30px;
    text-align: center;
    color: black;
  }
  .formik_button {
    margin-top: 20px;
    text-align: center;
  }
`

const DataIndex = (props) => {
  const user = useSelector((store) => store.userReducer)
  const t = Math.pow(user.userGrowth, 2) / 10000
  const indexBody = user.userWeigth / t

  if (indexBody) return
}

const Profil = () => {
  const user = useSelector((store) => store.userReducer)
  const setModalContext = useContext(ModalContext)
  const [getDifferenceInWeight, setGetDifferenceInWeigh] = useState('')
  const dispatch = useDispatch()

  const DataOfLosingWeigth = (weigthToday) => {
    if (weigthToday > user.userWeigth) {
      const difference = weigthToday - user.userWeigth
      dispatch(amountOfLosedWeigth(`You up on weigth + ${difference}kg`))
      setGetDifferenceInWeigh(`You up on weigth + ${difference}kg`)
      console.log(weigthToday)
      return console.log(`today weigth hieg then befor`)
    }
    const difference = user.userWeigth - weigthToday
    setGetDifferenceInWeigh(`You lost - ${difference} kg`)

    return console.log('you losing weigth')
  }

  //const user = useSelector((store) => store.userReducer)
  // const t = Math.pow(user.userGrowth, 2) / 10000
  // const indexBody = user.userWeigth / t

  const hendleAddWeigthValue = () => {
    let day = new Date()
    const dayValue = day.getDate()

    setModalContext(
      <StyledModalProfilForm>
        <div className="close_element">
          <button
            className="button_close"
            onClick={() => {
              setModalContext()
            }}
          >
            X
          </button>
        </div>
        <header>Add new weigth</header>
        <Formik
          initialValues={{
            weigthValue: '',
            day: dayValue,
          }}
          validate={(formValues) => {
            const errorObj = {}

            if (!formValues.weigthValue) {
              errorObj.weigthValue = 'Fill the fields'
            } else if (!formValues.weigthValue.replace(/\D+/g, '')) {
              errorObj.weigthValue = 'Write the number'
            }

            return errorObj
          }}
          onSubmit={(formValues, { resetForm }) => {
            console.log(formValues.day)
            if (formValues.day % 2 != 0) {
              let arr = []
              arr.push(formValues)

              console.log(arr[arr.length - 1])
            }
            dispatch(usersWeigth(formValues))

            DataOfLosingWeigth(formValues.weigthValue)
            Server.post('/historyOfWeigth', {
              weigthValue: formValues.weigthValue,
              day: formValues.day,
            }).then((response) => {})
            resetForm()
            setModalContext()
          }}
        >
          <Form>
            <FormikInput
              name="weigthValue"
              type="text"
              placeholder="Weigth today"
            />
            <div className="formik_button">
              <ButtonOptions
                type="submit"
                className="button button_add"
                textInsideButton={'Add new weigth'}
              />
            </div>
          </Form>
        </Formik>
      </StyledModalProfilForm>
    )
  }

  return (
    <StyledProfil>
      <div className="user_name">
        <div className="user__information-data">
          {' '}
          <p className="user_name_text">Hi, {user.userName}</p>
          <div className="user_weigth-information">
            <p className="user_weigth_today">
              {' '}
              Your weigth - {user.userWeigthToday}
            </p>
            <p className="user_weigth-differance">{getDifferenceInWeight}</p>
          </div>
          <ProgressBar procent={user.procent} />
          <div className="button">
            {' '}
            <ButtonOptions
              handleClick={hendleAddWeigthValue}
              className="button button_add"
              textInsideButton={'+Weigth'}
            />
          </div>
        </div>
      </div>
      <div className="user_schedule">
        {' '}
        <Schedule weigthToday={user.userWeigthToday} />
      </div>
      <div className="user_information">fdgvbbftbhfg</div>
    </StyledProfil>
  )
}

export default Profil
