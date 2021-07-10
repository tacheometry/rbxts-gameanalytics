type EGAResourceFlowType = {
	Source: "Source";
	Sink: "Sink";
};
type EGAProgressionStatus = {
	Start: "Start";
	Complete: "Complete";
	Fail: "Fail";
};
type EGAErrorSeverity = {
	debug: "debug";
	info: "info";
	warning: "warning";
	error: "error";
	critical: "critical";
};
type PlayerId = number | string;

type LuaDictionary = Map<any, any> | Record<any, any>;

declare namespace GameAnalyticsLibrary {
	/**
	 * The GameAnalytics SDK.
	 * @server
	 */
	export const GameAnalytics: {
		EGAResourceFlowType: EGAResourceFlowType;
		EGAProgressionStatus: EGAProgressionStatus;
		EGAErrorSeverity: EGAErrorSeverity;
		/**
		 * @link https://gameanalytics.com/docs/s/article/Roblox-SDK-Setup#Using-The-SDK
		 */
		initialize(options: {
			gameKey: string;
			secretKey: string;
			automaticSendBusinessEvents?: boolean;
			availableCustomDimensions01?: string[];
			availableCustomDimensions02?: string[];
			availableCustomDimensions03?: string[];
			availableGamepasses?: number[];
			availableResourceCurrencies?: string[];
			availableResourceItemTypes?: string[];
			build?: string;
			enableDebugLog?: boolean;
			enableInfoLog?: boolean;
			enableVerboseLog?: boolean;
			reportErrors?: boolean;
			useCustomUserId?: boolean;
		}): void;

		/**
		 * Business events are used to track real-money transactions.
		 *
		 * The SDK will convert the specified Robux amount to USD before sending it our servers. GameAnalytics servers expect all business event amounts to be in cents.
		 *
		 * SDK conversion formula:
		 *
		 * **USD cents = (1 Robux * 0.7) * 0.35**.
		 * @param amount The amount of Robux.
		 * @param itemType The type/category of the item.
		 * @param itemId The specific item bought.
		 * @param cartType The game location of the purchase. Max 10 unique values.
		 * @link https://gameanalytics.com/docs/s/article/Roblox-Event-Tracking
		 * @example
addBusinessEvent(100, {
	amount: 100,
	itemType: "boost",
	itemId: "megaBoost",
	cartType: "ingame"
});
		 */
		addBusinessEvent(
			playerId: PlayerId,
			options: {
				amount: number;
				itemType: string;
				itemId: string;
				cartType: string;
			}
		): void;

		/**
		 * Resource events are used to register the flow of your in-game economy (virtual currencies) – the sink (subtraction) and the source (addition) of each virtual currency.
		 * > Before calling the resource event it is needed to specify what discrete values can be used for currencies and item types in the Configuration phase.
		 * @link https://gameanalytics.com/docs/s/article/Roblox-Event-Tracking
		 * @example
// source (add) Gem currency from an in-app purchase.
addResourceEvent(Player.UserId, {
	flowType: GameAnalytics.EGAResourceFlowType.Source,
	currency: "Gems",
	amount: 400,
	itemType: "IAP",
	itemId: "Coins400"
});

// sink (subtract) Gem currency to buy an item.
addResourceEvent(Player.UserId, {
    flowType: GameAnalytics.EGAResourceFlowType.Sink,
    currency: "Gems",
    amount: 400,
    itemType: "IAP",
    itemId: "Coins400"
});
		 */
		addResourceEvent(
			playerId: PlayerId,
			options: {
				/**
				 * A defined enum for sourcing and sinking resources.
				 */
				flowType: EGAResourceFlowType[keyof EGAResourceFlowType];
				/**
				 * The resource type/currency to track. Has to be one of the configured available resource currencies.
				 *
				 * This string can only contain [A-Za-z] characters.
				 */
				currency: string;
				/**
				 * Amount sourced or sinked. 0 or negative numbers are not allowed.
				 */
				amount: number;
				/**
				 * For **sink** events it can describe an item category you are buying (*Weapons*) or a place (*Gameplay*) where the currency was consumed.
				 *
				 * For **source** events it can describe how the currency was gained. For example “IAP” (for in-app purchase) or from using another currency (*Gems*). Has to be one of the configured available itemTypes.
				 */
				itemType: string;
				/**
				 * For **sink** events it describes how the specific item (*SwordOfFire*) was gained. If the item was consumed during gameplay you can simply use “Consumed”.
				 *
				 * For **source** events it describes how the player got the added currency. This could be buying a pack (*BoosterPack5*) or earned through gameplay when completing a level (*LevelEnd*).
				 */
				itemId: string;
			}
		): void;

		/**
		 * Progression events are used to track attempts at completing some part of a game (level, area). A defined area follows a 3 tier hierarchy structure (could be world:stage:level) to indicate what part of the game the player is trying to complete.
		 * 
		 * When a player is starting a progression attempt a start event should be added.
		 * 
		 * When the player then finishes the attempt a fail or complete event should be added along with a score if needed.
		 * 
		 * It is not required to use all 3 progression parameters.
		 * @link https://gameanalytics.com/docs/s/article/Roblox-Event-Tracking
		 * @example
// Add a progression start event.
addProgressionEvent(Player.UserId, {
    progressionStatus = GameAnalytics.EGAProgressionStatus.Start,
    progression01: "world01",
    progression02: "stage01",
    progression03: "level01"
});

// Or with score on complete or fail attempt:
addProgressionEvent(Player.UserId, {
    progressionStatus = GameAnalytics.EGAProgressionStatus.Complete,
    progression01: "world01",
    progression02: "stage01",
    progression03: "level01",
    score = 100
});
		 */
		addProgressionEvent(
			playerId: PlayerId,
			options: {
				progressionStatus: EGAProgressionStatus[keyof EGAProgressionStatus];
				progression01: string;
				progression02?: string;
				progression03?: string;
				score?: number;
			}
		): void;

		/**
		 * During the game it is possible to set the active value for each custom dimension dynamically. Once a dimension is set it will be **persisted** across sessions/game-start and automatically be added to all event categories. Remember you have to set the custom dimensions before initializing the SDK (but after setting the available custom dimensions) to be able to add the dimensions to the first session start event.
		 *
		 * To reset a set custom dimension simply just set it to empty string.
		 * @link https://gameanalytics.com/docs/s/article/Roblox-SDK-GameOps#Custom-Dimensions
		 */
		configureAvailableCustomDimension01(
			playerId: PlayerId,
			dimension: string
		): void;
		/**
		 * @see configureAvailableCustomDimension01
		 */
		configureAvailableCustomDimension02(
			playerId: PlayerId,
			dimension: string
		): void;
		/**
		 * @see configureAvailableCustomDimension01
		 */
		configureAvailableCustomDimension03(
			playerId: PlayerId,
			dimension: string
		): void;
		configureAvailableResourceCurrencies(
			resourceCurrencies: string[]
		): void;
		configureAvailableResourceItemTypes(resourceItemTypes: string[]): void;
		configureBuild(build: string): void;
		configureAvailableGamepasses(availableGamepasses: number[]): void;

		/**
		 * Error events are used to track custom errors in the game code. You can group the events by severity level and attach a message.
		 * @link https://gameanalytics.com/docs/s/article/Roblox-Event-Tracking
		 * @example
addErrorEvent(Player.UserId, {
    severity: GameAnalytics.EGAErrorSeverity.critical,
    message: "Something went bad in some of the smelly code!"
});
		 */
		addErrorEvent(
			playerId: PlayerId,
			options: {
				/**
				 * The severity of the error.
				 */
				severity: EGAErrorSeverity[keyof EGAErrorSeverity];
				/**
				 * The error message (can be omitted)
				 * @example "Error when entering level12"
				 */
				message?: string;
			}
		): void;

		/**
		 * Every game is special. Therefore some needed events might not be covered by our other event types. The **design event** is available for you to add your own event-id hierarchy.
		 * > Please note that custom dimensions and progression filters will not be added on design and error events. Therefore you cannot (at the moment) filter by these when viewing design or error metrics.
		 * 
		 * **It is important to not generate an excessive amount of unique nodes possible in the event hierarchy tree.**
		 * 
		 * A bad implementation example:
		 * 
		 * `[level_name]:[weapon_used]:[damage_done]`
		 * 
		 * `level_name` could be 100 values, `weapon_used` could be 300 values and `damage_done` could be 1-5000 perhaps. This will generate an event hierarchy with:
		 * 
		 * **100 * 300 * 5000 = 1.5M possible nodes.**
		 * 
		 * This is far too many. Also the damage should be put as a value and not in the event string. The processing will perhaps be blocked for a game doing this and cause other problems when browsing our tool.
		 * 
		 * The maximum amount of unique nodes generated should be around 10k.
		 * @link https://gameanalytics.com/docs/s/article/Roblox-Event-Tracking
		 * @example
addDesignEvent(Player.UserId, {
    eventId: "Kill:Sword:Robot"
});

// It is also possible to add a float value to the event.
// This will (in addition to count) make the mean and sum aggregation available in the tool.
addDesignEvent(Player.UserId, {
    eventId: "BossFights:FireLord:KillTimeUsed",
    value = 234
});
		 */
		addDesignEvent(
			playerId: PlayerId,
			options: {
				/**
				 * The eventId is a hierarchy string that can consist of 1-5 segments separated by ‘:’. Each segment can have a max length of 32.
				 */
				eventId: string;
				/**
				 * A float event tied to the eventId. Will result in sum & mean values being available in the website.
				 */
				value?: number;
			}
		): void;

		/**
		 * Call this function to manually check if Remote Configs is ready (has been populated with values).
		 */
		isRemoteConfigsReady(playerId: PlayerId): boolean;

		/**
		 * If the specified key is not found in the Remote Configs it will return the default value either “normal” or “custom” default value.
		 * @link https://gameanalytics.com/docs/s/article/Remote-Configs-Introduction
		 * @link https://gameanalytics.com/docs/s/article/Roblox-SDK-GameOps#Remote-Configs
		 */
		getRemoteConfigsValueAsString(
			playerId: PlayerId,
			options: {
				key: string;
				defaultValue?: string;
			}
		): string | undefined;

		/**
		 * Short messages will be output when enabled explaining when some action is being performed by the SDK. Sometimes cropping text / values to make it more readable.
		 *
		 * Enable info log when implementing the SDK, but remember to **turn it off** in production!
		 */
		setEnabledInfoLog(flag: boolean): void;

		/**
		 * Console output when each event is added (all fields) in JSON string format. This is the data being submitted to the GA servers for each event.
		 *
		 * Enable verbose log when troubleshooting events.
		 *
		 * This can result in a lot of text. When troubleshooting/debugging events it is therefore recommended to enable/disable when performing the action that need inspection.
		 */
		setEnabledVerboseLog(flag: boolean): void;

		/**
		 * If you for GDPR purposes need to disable event submission you can call this function.
		 *
		 * By default event submission is of course enabled. You will still receive configs if you have set any for your game even after disabling event submission.
		 */
		setEnabledEventSubmission(flag: boolean): void;

		setEnabledAutomaticSendBusinessEvents(flag: boolean): void;

		/**
		 * If you have a multi-place game and don’t want to end sessions in between places when teleporting.
		 */
		addGameAnalyticsTeleportData<D extends Record<any, unknown>>(
			playerIds: PlayerId[],
			teleportData: D
		): D & {
			gameanalyticsData: Map<unknown, unknown>;
		};
	};

	/**
	 * TS only function that initializes GameAnalytics on the server side with predefined options.
	 * If you are using `GameAnalytics.initialize`, don't run this function.
	 * @server
	 */
	export const initializeServer: (gameKey: string, secretKey: string) => void;
	/**
	 * TS only function that sets up GameAnalytics on the client side. This should get run in a client-side context once the LocalPlayer finishes loading.
	 * @client
	 */
	export const initializeClient: () => void;
}

export = GameAnalyticsLibrary;
