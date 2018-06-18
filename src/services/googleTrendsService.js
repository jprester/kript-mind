const googleTrends = require('google-trends-api');

export default googleTrends.interestOverTime({keyword: 'Royal Wedding'}, function(err, results){
    if(err) console.error('there was an error!', err);
    else console.log('my sweet sweet results', results);
});