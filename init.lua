local GameAnalytics
if game:GetService("RunService"):IsServer() then
	GameAnalytics = require(script:WaitForChild("gameanalytics-sdk"):WaitForChild("GameAnalytics"))
end

return {
	initializeClient = function()
		require(script:WaitForChild("gameanalytics-sdk"):WaitForChild("GameAnalyticsClient"))
	end,
	initializeServer = function(gameKey, secretKey)
		GameAnalytics:initialize({
			build = "0.1",

			gameKey = gameKey,
			secretKey = secretKey,

			enableInfoLog = true,
			enableVerboseLog = false,

			--debug is by default enabled in studio only
			enableDebugLog = nil,

			automaticSendBusinessEvents = true,
			reportErrors = true,

			availableCustomDimensions01 = {},
			availableCustomDimensions02 = {},
			availableCustomDimensions03 = {},
			availableResourceCurrencies = {},
			availableResourceItemTypes = {},
			availableGamepasses = {},
		})
	end,
	GameAnalytics = GameAnalytics,
}
