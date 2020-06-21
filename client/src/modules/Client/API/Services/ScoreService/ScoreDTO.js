export default class User {
    constructor(game, time, resultGood, resultWrong, user) {
      this.game = game;
      this.time = time
      this.resultGood = resultGood;
      this.resultWrong = resultWrong;
      this.user = user;
    }
 
    getUserDTO() {
       return {
          user: {
            game : this.game,
            time: this.time,
            resultGood: this.resultGood,
            resultWrong :this.resultWrong,
            user: this.user,
          }
       };
    }
 }
 