import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import {
  PhotoPayLoadForRedux,
  TPropertyTypes,
  TpropertyAndOwner,
} from '../../Types/propertyTypes'

export const CreatePropertyThunk = createAsyncThunk(
  'creatProperty/post',
  async (obj: TpropertyAndOwner, { dispatch }) => {
    let { OwnerInformation, propertyInformation } = obj
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}property`,
        { OwnerInformation, propertyInformation },
      )
      let propertyId = ''

      // console.log(res.data)
      // console.log(res)
      if (res.data.property) {
        propertyId = res.data.property[0].id
        console.log(res.data.property[0].id, 'MUTELI')
      } else {
        propertyId = res.data.id
      }
      await dispatch(UploadPhotos({ pictures: obj.pictures, propertyId }))

      return res.data
    } catch (error) {
      const err: any = error
      console.log(error)
      throw new Error(err.response.data.message)
    }
  },
)

export const GetMoreData = createAsyncThunk(
  'getallinfo/info',
  async (page: number) => {
    try {
      let url = `${
        import.meta.env.VITE_BASE_API_URL
      }property?page=${page}&limit=60`

      const res = await axios.get(url)
      return res.data
    } catch (error) {
      throw new Error('ERROR')
    }
  },
)
export const UploadPhotos = createAsyncThunk(
  'uploadphotos/post',
  async (obj: PhotoPayLoadForRedux) => {
    try {
      const { pictures, propertyId } = obj
      console.log(obj)
      const formData = new FormData()
      pictures.forEach((file, index) => {
        formData.append(`pictures`, file)
      })

      formData.append('propertyId', propertyId)

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}pictures`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      return res.data
    } catch (error) {
      const err: any = error
      console.error(error)
      throw new Error(err.response.data.message)
    }
  },
)

export const GetAllpropertysThunk = createAsyncThunk(
  'allpropertys/get',
  async (querys: any) => {
    try {
      const {
        page,
        limit,
        minPrice,
        maxPrice,
        featureType,
        propertyType,
        search,
        location,
        status,
      } = querys
      let url = `${
        import.meta.env.VITE_BASE_API_URL
      }property?page=${page}&limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}`

      // Add propertyType if it exists
      if (propertyType) {
        url += `&propertyType=${propertyType}`
      }

      // Add featureType if it exists
      if (featureType) {
        url += `&featureType=${featureType}`
      }

      // Add location if it exists
      if (location) {
        url += `&location=${location}`
      }

      // Add search if it exists
      if (search) {
        url += `&search=${search}`
      }
      // status
      if (status) {
        url += `&status=${status}`
      }
      console.log(url)
      const res = await axios.get(url)
      return res.data
    } catch (error) {
      throw new Error('ERROR')
    }
  },
)

export const GetSinglePropert = createAsyncThunk(
  'single/get',
  async (id: string) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}property/${id}`,
      )
      return res.data
    } catch (error) {
      throw new Error('ERROR')
    }
  },
)

export const Updateproperty = createAsyncThunk(
  'property/update',
  async (obj: any) => {
    try {
      delete obj.data.id
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_API_URL}admin/updateProperty/${obj.id}`,
        { ...obj.data },
        {
          headers: {
            Authorization: `Bearer ${obj.token}`,
          },
        },
      )
      return res.data
    } catch (error) {
      throw new Error('ERROR')
    }
  },
)

export const Deleteproperty = createAsyncThunk(
  'proeprty/delete',
  async (obj: any) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_API_URL}admin/updateDelete/${obj.id}`,
        {
          headers: {
            Authorization: `Bearer ${obj.token}`,
          },
        },
      )
      return res.data
    } catch (error) {
      throw new Error('ERROR')
    }
  },
)
