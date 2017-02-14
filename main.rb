require "sinatra"
require_relative './functions.rb'
require "pry"
require "csv"
require 'json'




def save_scores(time_data)
	info = File.open("/Users/Wipf/Code/projects/waldo/views/data.erb", "a") # a to append
	info.print "\n"
	info.print time_data + " Seconds"
	


	info.close
end



enable :sessions

get ("/"){

	erb :index
}

get ("/waldodata"){

	erb :data  
}

	
post ("/"){

	check(params["offsetX"], params["offsetY"])
	return session["found"]

}

get ("/data") {

 	erb :data
}

def check(x,y)

	if (x.to_i >= 430) and (x.to_i  <= 480)  and (y.to_i >= 450) and (y.to_i <= 530) then	
 		session[:found] = "true"
 		save_scores(params["time"])
	else
		session[:found] = "false"
	end
end



