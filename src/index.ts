import axios from 'axios';
import { User } from './models/User';

axios.post('http://localhost:3000/users', { name: 'Daahir Abdi', age: 24})
