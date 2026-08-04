import {reservations,sessions,integrations} from '../mock/data';
const wait=<T,>(data:T,fail=false)=>new Promise<T>((resolve,reject)=>setTimeout(()=>fail?reject(new Error('A simulated integration error occurred.')):resolve(data),380+Math.random()*300));
export const api={reservations:(q='')=>wait(reservations.filter(r=>Object.values(r).join(' ').toLowerCase().includes(q.toLowerCase()))),sessions:()=>wait(sessions),integrations:()=>wait(integrations),checkIn:()=>wait({room:'508',wifi:'Premium Guest — two devices',credential:'Mobile credential issued',floors:'Floor 5 · Gym · Pool'})};
