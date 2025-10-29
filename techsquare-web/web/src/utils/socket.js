import { io } from 'socket.io-client';
import { BASE_URL } from './constants';

export const socketConnection = () => {
  if(location.hostname === 'devlopement')
    return io(BASE_URL);
  else 
    return io('/', {path: '/api/socket.io'});
};
