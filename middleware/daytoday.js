function RequireDayToBeTuesday(req, res, next) {
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let now = new Date();
    let dayToday = days[ now.getDay() ];
    console.log(dayToday);
    if (dayToday == "Tuesday") {
      res.status("401").send("User is unauthenticated.");
    } else {
      next();
    }
  }

module.exports = RequireDayToBeTuesday;