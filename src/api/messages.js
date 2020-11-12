import axios from 'axios'
import { API } from '../constants'

const client = axios.create({
  withCredentials: true,
  timeout: 10000,
})

export const getMessages = async (data) =>
  (await client.get(`${API}messages/`, data)).data

export const postMessage = async (data) =>
  (await client.post(`${API}messages/`, data)).data

export const updateMessage = async (data) =>
  (await client.put(`${API}messages/`, data)).data

export const deleteMessage = async (data) =>
  (await client.delete(`${API}messages/`, { data })).data
