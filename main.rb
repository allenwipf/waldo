require "sinatra"
require_relative './functions.rb'
require "pry"
require "csv"
require 'json'
enable :sessions

get ("/"){
	erb :index
}

get ("/waldodata"){
	erb :data  
}

	
post ("/"){
	check(params["offsetX"], params["offsetY"], params["imageId"])
	return session["found"]
}

get ("/data") {

	getHighestScores(params["picId"])
	return session["highScores"]
}





