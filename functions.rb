# require 'net/http'
# require 'json'

# def waldoLocation()

# 	uri = URI("http://localhost:4567/waldodata")

# 	rawData = Net::HTTP.get(uri)
# 	parsedData = JSON.parse(rawData)

# 	# puts parsedData
# 	puts parsedData
# 	puts parsedData[0]["xMin"]

# end

# waldoLocation()