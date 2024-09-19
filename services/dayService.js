const dayDao = require('../dao/dayDao');

module.exports = {
  getAllDays: () => {
    return dayDao.getAllDays();
  },
  getDayData: (date) => {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA');
    return dayDao.getDay(date)},
  
  createOrUpdateDay: (date, note, tasks_todo, tasks_if_possible, tasks_optional) => 
    dayDao.createOrUpdateDay(date, note, tasks_todo, tasks_if_possible, tasks_optional)
};