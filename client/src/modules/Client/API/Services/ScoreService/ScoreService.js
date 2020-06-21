import Request from '../../Requests/Request'
import API from '../../API'
import Score from './ScoreDTO'
// TODO: tu import classy DTO


class ScoresService {
  static async get() {
    try {
      const doc = await Request.get(API.ROUTES.Scores.GET_SCORES);
      // TODO: tu pownie trzeba zamienić to co przyszlo na DTO
      return doc;
    } catch {console.log("nie udalo się pobrać scoralist - scoreservices")}
  }

  static async getById(id){
    try {
      const doc = await Request.getById(API.ROUTES.Scores.GET_SCORES_BY_ID, id)
      return doc
    } catch (err) {console.log("error")}   
  }


  static async create(item){
    const {game, time, resultGood, resultWrong, user} = item // tu jeszcze można pobrać haslo
    const score = new Score(game, time, resultGood, resultWrong, user)
    try {
      const doc = await Request.post(API.ROUTES.Scores.CREATE_SCORES,{score});
      console.log('score w Scoreservice create ' + JSON.stringify(doc.data))
      return doc;
    } catch (err) {
      console.log('error inside Scoreservices - createuser');
    }
  }


  static async update (item) {
    try {
      const doc = await Request.update(API.ROUTES.Scores.UPDATE_SCORES, item)
    return doc    }
    catch (err) {
      
    }
  }


  static async delete (id) {
    try {
      const doc = Request.delete(API.ROUTES.Scores.DELETE_SCORES_BY_ID, id)
      return doc
    }
    catch {

    }
  }

}

export default ScoresService;
