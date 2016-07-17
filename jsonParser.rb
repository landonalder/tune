require 'json'
require 'Date'

def mergeFiles(usersFilePath, activityLogPath)
  usersFile = File.read(usersFilePath)
  activityLog = File.read(activityLogPath)

  users = JSON.parse(usersFile)
  activities = JSON.parse(activityLog)

  users.each do |user|
    impressionCount = 0
    conversionCount = 0
    revenue = 0
    conversionsByDay = {}

    activities.each do |activity|
      if activity["user_id"] != user["id"]
        next
      end
        
      if activity["type"] == "conversion"
        conversionCount += 1
        revenue += Integer(activity["revenue"])
        date = DateTime.parse(activity["time"]).strftime('%m/%d')


        if !conversionsByDay[date]
          conversionsByDay[date] = 1
        else
          conversionsByDay[date] += 1
        end
      end

      if activity["type"] == "impression"
        impressionCount+= 1
      end
    end

    conversionsByDay = conversionsByDay.sort.map do |pair|
      { "date" => pair[0], "conversions" => pair[1] }
    end

    user["impressionCount"] = impressionCount
    user["conversionCount"] = conversionCount
    user["revenue"] = revenue
    user["conversionsByDay"] = conversionsByDay
  end

  File.open('users.json', 'w') { |file|
    file.write(users.to_json)
  }
end
