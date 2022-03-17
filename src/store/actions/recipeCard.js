import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { CARD_LIST_ACTIONS } from 'store/actionTypes'
import axios from 'axios'

export const recipeCard = createAction(CARD_LIST_ACTIONS.list)

export const typeOfDish = createAction(CARD_LIST_ACTIONS.typeOfDish)

export const addProduct = createAsyncThunk(
  CARD_LIST_ACTIONS.add,

  async (productItem) => {
    const options = {
      params: {
        query: `${productItem.productName}`,
      },
    }
    //const obj = { productName: 'carrot', Weigth: '200', calorie: '65' }
    const obj = productItem
    /* const response = await apiRequest.request('/foods/search', options)
    {
      ...productItem,
      calorie: response.data.foods[0].foodNutrients[3].value,
    }*/
    return obj
  }
)

export const deleteItem = createAction('deleteItem')

export const editItem = createAction('editItem')
