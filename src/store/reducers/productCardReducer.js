import { CARD_LIST_ACTIONS } from 'store/actionTypes'
import {
  recipeCard,
  addProductToTable,
  getCalorieCount,
} from 'store/actions/recipeCard'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  calorie: null,
  productCardReducer: null,
  isEdited: false,
}

const productCardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(recipeCard, (state, action) => {
      if (!state.productCardReducer) state.productCardReducer = []
      state.productCardReducer.push(action.payload)
    })

    .addCase(getCalorieCount.fulfilled, (state, action) => {
      if (!state.calorie) state.calorie = []
      state.calorie.push(action.payload)
    })
    .addMatcher(
      (action) => {
        return action.payload && typeof action.payload.setListModifyed
      },
      (state) => {
        state.isEdited = true
      }
    )
})

export default productCardReducer
