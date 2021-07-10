<h1 align="center">📈 GameAnalytics SDK 📊</h1>

TS typings for the GameAnalytics Roblox SDK.

-   **[GaneAnalytics SDK repository](https://github.com/GameAnalytics/GA-SDK-ROBLOX/)**
-   **[GameAnalytics SDK documentation](https://gameanalytics.com/docs/s/article/Roblox-SDK-Setup#Using-The-SDK)**
-   **[This package's repository](https://github.com/tacheometry/rbxts-gameanalytics)**

<h2>Installation</h2>

[![NPM](https://nodei.co/npm/@rbxts/gameanalytics.png)](https://npmjs.org/package/@rbxts/gameanalytics)

Run `npm i @rbxts/gameanalytics` in your project directory.

<h3>Differences between the Luau version</h3>

Unlike the normal Luau Roblox SDK, this package does not require moving scripts around in different DataModel locations.

<h2>Usage</h2>

<h3>Server side</h3>

In a server script, run `GameAnalytics.initialize`

```ts
import { GameAnalytics } from "@rbxts/gameanalytics";

GameAnalytics.initialize({
	gameKey: "<GAME KEY HERE>",
	secretKey: "<SECRET KEY HERE>",
	availableResourceCurrencies = ["Coins"],
	...
});
```

or `initializeServer`, which uses a predefined configuration:

```ts
import { initializeServer } from "@rbxts/gameanalytics";

initializeServer("<GAME KEY HERE>", "<SECRET KEY HERE>");
```

<details>
<summary>Predefined configuration values</summary>

```ts
{
	build: "0.1",

	enableInfoLog: true,
	enableVerboseLog: true,

	// debug is enabled in Studio by default
	enableDebugLog: undefined,

	automaticSendBusinessEvents: true,
	reportErrors: true,

	availableCustomDimensions01: [],
	availableCustomDimensions02: [],
	availableCustomDimensions03: [],
	availableResourceCurrencies: [],
	availableResourceItemTypes: [],
	availableGamepasses: []
}
```

</details>

After initialization, you can now fire analytics events, such as `GameAnalytics.addDesignEvent`, `GameAnalytics.addProgressionEvent`, `GameAnalytics.addResourceEvent`. It's strongly recommended that you read the [Event Tracking guide](https://gameanalytics.com/docs/s/article/Roblox-Event-Tracking) for the usage of these functions.

<h3>Client side</h3>

In a client script, run `initializeClient`:

```ts
import { initializeClient } from "@rbxts/gameanalytics";

initializeClient();
```

<h3>Warning</h3>

Retrieving data from the server on the client side (A/B experiment data, Remote Configs), is not implemented in the GameAnalytics SDK. If you want to use one of these features on the client side, you will have to create RemoteEvents manually.

<h3>Custom User Ids</h3>

For custom usernames, implementing this such as in the guide (on the client side) is not recommended for security reasons.

<details>
<summary>Instead, when using GameAnalytics User Ids (such as with event tracking functions) it's simpler to pass a Player's UserId to a function to retrieve their custom username</summary>

```ts
const getUsername = (player: Player) => {
	// don't actually use DisplayNames
	return player.DisplayName;
};

GameAnalytics.addDesignEvent(getUsername(player), {
	eventId: "testEvent",
});
```

</details>

---

If you would like to contribute to the GameAnalytics Roblox SDK, please file Pull Requests and Issues in [its GitHub repository](https://github.com/GameAnalytics/GA-SDK-ROBLOX/), and not in the repository of this package. The types here will reflect the most recent release of the Luau code.
