import { CARD_LIST_ACTIONS } from 'store/actionTypes'
import {
  recipeCard,
  editItem,
  addProduct,
  deleteItem,
  typeOfDish,
} from 'store/actions/recipeCard'
import { createReducer } from '@reduxjs/toolkit'
import { userMenu } from '../actions/exampleOfMenu'
const initialState = {
  product: null,
  listOfProduct: [],
  typeOfDish: '',
  userMenuOfList: [],
  isEdited: false,
  loading: 'loading',
}

const productCardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(recipeCard, (state, action) => {
      if (!state.productCardReducer) state.productCardReducer = []
      state.productCardReducer.push(action.payload)
    })

    .addCase(addProduct.pending, (state, action) => {
      state.loading = 'pending'
    })
    .addCase(addProduct.fulfilled, (state, action) => {
      state.loading = 'fulfilled'

      state.listOfProduct.push(action.payload)
    })
    .addCase(addProduct.rejected, (state, action) => {})
    .addCase(deleteItem, (state, action) => {
      const newlistofProduct = [...state.listOfProduct]
      newlistofProduct.splice(action.payload, 1)

      state.listOfProduct = newlistofProduct
    })

    .addCase(editItem, (state, action) => {
      const { index, weigth } = action.payload

      const newlistofProduct = [...state.listOfProduct]

      newlistofProduct.find((product, productIndex) => {
        if (productIndex === index) {
          product.Weigth = weigth
        }
      })
      state.listOfProduct = newlistofProduct
    })

    .addCase(typeOfDish, (state, action) => {
      state.typeOfDish = action.payload
    })
    .addCase(userMenu, (state, action) => {
      const obj = { dish: action.payload, type: state.typeOfDish }
      console.log(obj)
      state.userMenuOfList.push(obj)
      state.listOfProduct = []
      console.log('hi')
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
