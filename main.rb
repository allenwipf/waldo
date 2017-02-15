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
	check(params["offsetX"], params["offsetY"])
	return session["found"]
}

get ("/data") {

	getHighestScores
	return session["highScores"]

	erb :data

 
}





