const cron = require('node-cron');
const {subDays, endOfDay, startOfDay } = require('date-fns');
const ConnectionRequest = require('../models/connectionRequest');
const sendEmail = require('./sesEmail');

cron.schedule("02 40 21 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 0);

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequest.find({
      status: 'Interested',
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd
      }
    }).populate('fromUserId toUserId');

    const emailIds = [...new Set(pendingRequests.map((pr) => (pr.toUserId.email)))];
    console.log(emailIds, ' emailIds');
    for (const email of emailIds) {
      try {
        const res = await sendEmail.run('A New Friend Request have been recieved yesterday ' + email, 'Please have a look at requests by login our portal TechSqaure.work.gd');
        // const res = await sendEmail.run(
        //   "New Friend Requests pending for " + email,
        //   "Ther eare so many frined reuests pending, please login to DevTinder.in and accept or reject the reqyests."
        // );
        console.log(res, ' heyyy')
      } catch(err) {
        console.log(err + ' Error is sent email please have a look at this!');
      }
    }
  } catch(err) {

  }
});
