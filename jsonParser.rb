require 'json'

def mergeFiles(usersFilePath, activityLogPath)
  usersFile = File.read(usersFilePath)
  activityLog = File.read(activityLogPath)

  users = JSON.parse(usersFile)
  activities = JSON.parse(activityLog)

  users.each do |user|
    impressionCount = 0
    conversionCount = 0
    revenue = 0
    activities.each do |activity|
      if activity["user_id"] == user["id"]
        if activity["type"] == "conversion"
          conversionCount += 1
          revenue += Integer(activity["revenue"])
        end

        if activity["type"] == "impression"
          impressionCount+= 1
        end
      end
    end

    user["impressionCount"] = impressionCount
    user["conversionCount"] = conversionCount
    user["revenue"] = revenue
  end

  File.open('users.json', 'w') { |file|
    file.write(users.to_json)
  }
end
