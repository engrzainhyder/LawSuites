import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ls_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('ls_token');
      localStorage.removeItem('ls_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const aiAPI = {
  match: (problemDescription) => api.post('/ai/match', { problemDescription }),
};

export const clientAPI = {
  register: (data) => api.post('/clients/register', data),
  login: (data) => api.post('/clients/login', data),
  getMe: () => api.get('/clients/me'),
  getAll: () => api.get('/clients'),
  remove: (id) => api.delete(`/clients/${id}`),
};

export const caseAPI = {
  getMyCases: () => api.get('/cases/my'),
  getAll: () => api.get('/cases'),
  getById: (id) => api.get(`/cases/${id}`),
  update: (id, data) => api.put(`/cases/${id}`, data),
  remove: (id) => api.delete(`/cases/${id}`),
  addHearing: (id, data) => api.post(`/cases/${id}/hearings`, data),
  deleteHearing: (caseId, hearingId) => api.delete(`/cases/${caseId}/hearings/${hearingId}`),
};

export default api;
