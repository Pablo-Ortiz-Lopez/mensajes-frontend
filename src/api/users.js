import axios from 'axios'
import { API } from '../constants'

const client = axios.create({
  withCredentials: true,
  timeout: 10000,
})

export const register = async (data) =>
  (await client.post(`${API}users/register`, data)).data

export const credentials = async (data) =>
  (await client.get(`${API}users/credentials`, data)).data

export const login = async (data) =>
  (await client.post(`${API}users/login`, data)).data

export const logout = async (data) =>
  (await client.post(`${API}users/logout`, data)).data
