import axios from 'axios';
const api = axios.create({ baseURL: 'http://10.0.2.2:3000/api' });

//TODO temporário até não ter autorização implementada
api.defaults.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTVhMWVmYmM2YzZjZDQ3NjUwMGRhZSIsInVzZXJuYW1lIjoiSnVsaWFubyBQb3NzYW1haSIsImlhdCI6MTczMTY4NjUyNn0.PyIl_UOrRJcUZU8BkSblTDdtZ_tFlhwMO-lD9wQqlfw';

export default api;