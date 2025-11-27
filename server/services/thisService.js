import This from '../models/this.js'; 

// פונקציה לקבלת פרשה לפי ID
export const findParasha = async () => {
    console.log('service');
  const p =  await This.findOne({idWeek:1});
  console.log(p);
  return p;
};

export const getStatus = async() =>{
  const p =  await This.findOne({idWeek:1});
  if (p)
    return p;
  else
    return false;
}
