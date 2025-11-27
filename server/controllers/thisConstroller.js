// controllers/myController.js
import {  getStatus }from '../services/thisService.js';

// פונקציה לקבלת פרשה לפי ID

export const getThis = async (req, res) => {
    try{
        const thisWeek = await getStatus();
        if (thisWeek){
            return res.status(200).json(thisWeek);
        }
        return res.status(404).json({message:'this week is not found'});
    } catch(e){
        return res.status(500).json({message: 'Server error', error });
    }
}


