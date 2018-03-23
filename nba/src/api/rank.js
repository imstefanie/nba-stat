import axios from 'axios';


export default {
  getRank() {
    return axios.get('http://localhost:3000/rank?a=conference');
  },
  getDivision(){
    return axios.get('http://localhost:3000/rank?a=division');
  },
  getTeamStat(type){
    return axios.get('http://localhost:3000/teamStat?item='+type);
  },
  getPersonStat(type,page){
    return axios.get(`http://localhost:3000/personStat?item=${type}&page=${page}`);
  },
  getSchedule(date){
    return axios.get('http://localhost:3000/schedule?date='+date);
  }
}
