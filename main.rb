require "sinatra"
require_relative './functions.rb'
require "pry"
require "csv"
require 'json'




def record_find(finddata)
	info = File.open("/Users/Wipf/Code/projects/waldo/views/data.erb", "w") # a to append
	# info.print "," + "\n"
	info.print finddata
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

	return check(params["offsetX"], params["offsetY"])
	return session["found"]
}

get ("/data") {

 	session[:found]
}

def check(x,y)

	if (x.to_i >= 430) and (x.to_i  <= 480)  and (y.to_i >= 450) and (y.to_i <= 530) then	
 		session[:found] = "true"
	else
		session[:found] = "false"
	end
end



