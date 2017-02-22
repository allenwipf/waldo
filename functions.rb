# checks if the posted x and y coordinances equal where Waldo is
# Returns either "true" or "false" string as the responseText to the Post request
def check(x,y,id)

		if (id.to_i == 1) and ((445..470).member?(x.to_i)) and ((470..550).member?(y.to_i)) then	
	 		session[:found] = "true"
	 		save_scores(params["time"])

		elsif (id.to_i == 3) and ((590..625).member?(x.to_i)) and ((320..350).member?(y.to_i)) then
			session[:found] = "true"

		elsif (id.to_i == 2) and ((600..625).member?(x.to_i)) and ((120..150).member?(y.to_i)) then
			session[:found] = "true"
		
		elsif (id.to_i == 4) and ((385..400).member?(x.to_i)) and ((430..440).member?(y.to_i)) then
			session[:found] = "true"

		else		
			session[:found] = "false"
		end
end

# appends each waldo find to csv file
def save_scores(time_data)
	info = File.open("/Users/Wipf/Code/projects/waldo/views/data.erb", "a") # a to append
	info.print "\n"
	info.print time_data + " Seconds"
	info.close
end


# Takes all scores and using regular expression takes out the numbers from each line,
# turns that number to a float and sorts. 
def getHighestScores
	
	timesArray = []
	File.open("/Users/Wipf/Code/projects/waldo/views/data.erb", "r") do |data|

		data.each_line do |time|	
			time = time[/\d+\S\d/].to_f   # regular expressions. Rebular.com
			timesArray.push(time)
		end	
	end

	timesArray = timesArray.sort
	timesArray = timesArray[0..9]

	records = beautifyHighScores(timesArray)
	session["highScores"] = records

end

# Takes the array of top 10 scores and adds "Seconds!" and new line character 
# to each score for display purposes
def beautifyHighScores(data)

	timesString = ''
	data.each do |score| 
		timesString += "#{score} Seconds <br>"
 	end

 	return timesString

end




