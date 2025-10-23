import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000' });
export async function fetchArtifacts({ q, category, monastery, page } = {}) {
  const params = {};
  if (q) params.q = q;
  if (category) params.category = category;
  if (monastery) params.monastery = monastery;
  if (page) params.page = page;
  const { data } = await api.get('/api/artifacts', { params });
  return data;
}
export async function fetchArtifact(id) {
  const { data } = await api.get(`/api/artifacts/${id}`);
  return data;
}
export async function fetchGuides() {
  const { data } = await api.get('/api/guides');
  return data;
}
export async function fetchEvents(params) {
  const { data } = await api.get('/api/events', { params });
  return data;
}
export async function planCircuit(monasteries) {
  const { data } = await api.post('/api/tours/plan', { monasteries });
  return data;
}
export default api;
