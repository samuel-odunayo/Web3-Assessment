/**
 * Asynchronously reads camera log files and returns hourly activity counts for a given day
 * @param {number} day - Day of week (0-6, where 0 is Sunday)
 * @returns {Promise<number[]>} Array of 24 numbers representing activity counts per hour
 */
async function activityTable(day) {
  let logFileList = await textFile("camera_logs.txt");
  
  let logFiles = logFileList.split("\n");
  
  let hourlyActivity = Array(24).fill(0);
  
  for (let fileName of logFiles) {
    if (!fileName.trim()) continue;
    
    let logContent = await textFile(fileName);
    
    let timestamps = logContent.split("\n");
    
    for (let timestamp of timestamps) {
      if (!timestamp.trim()) continue;
      
      let timeNum = Number(timestamp);
      
      let date = new Date(timeNum);
      
      if (date.getDay() === day) {
      
        let hour = date.getHours();
        hourlyActivity[hour]++;
      }
    }
  }
  
  return hourlyActivity;
}

// Example usage:
activityTable(1)
  .then(table => console.log(activityGraph(table)));
