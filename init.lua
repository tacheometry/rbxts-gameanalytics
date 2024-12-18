return {
	GameAnalytics = require(script:WaitForChild("gameanalytics-sdk")),
	
	initializeClient = function()
		if not game:GetService("RunService"):IsClient() then
			error("initializeClient() can only be called on the client")
		end

		return require(script:WaitForChild("gameanalytics-sdk")).initClient()
	end,

	initializeServer = function(gameKey: string, secretKey: string)
		if not game:GetService("RunService"):IsServer() then
			error("initializeServer() can only be called on the server")
		end

		return require(script:WaitForChild("gameanalytics-sdk")).initServer(gameKey, secretKey)
	end
}
