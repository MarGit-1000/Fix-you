# GENTA HAX - ANDROID - LUA DOCUMENTATION

Before we start, make sure you know the basics of Lua scripting. You can learn the fundamentals [here](https://lua.org/docs.html). There will be several custom data types such as **ImVec2**, **ImVec4**, **Vector2f**, **Vector3i**, etc. Make sure you understand the **basics** of Lua or you can abandon your dream of becoming a Lua scripter.

## Resources

- [ImGui](https://github.com/ocornut/imgui)
- [Lua](https://lua.org)
- [OpenSSL](https://www.openssl.org/)
- [Growtopia](https://www.growtopiagame.com/)

## Discord Server
[![Discord](https://img.shields.io/discord/870604052281573406)](https://discord.gg/JTM9b6XR3A)

## File Path
```
Android/media/GENTAHAX/Script/here.lua
```

---

## API Functions

### Player Functions

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `getLocal()` | `NetAvatar*` | Gets the local player avatar | `local player = getLocal()` |
| `getPlayerByNetID(int netid)` | `NetAvatar*` | Gets player by network ID | `local player = getPlayerByNetID(1)` |
| `getPlayerlist()` | `std::list<NetAvatar*>` | Gets list of all players in world | `local players = getPlayerlist()` |

### Inventory Functions

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `getInventory()` | `std::list<Inventory*>` | Gets player's inventory items | `local inv = getInventory()` |

### World Functions

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `getWorld()` | `World*` | Gets current world information | `local world = getWorld()` |
| `checkTile(int x, int y)` | `Tile*` | Gets tile at specific coordinates | `local tile = checkTile(50, 23)` |
| `getTile()` | `std::vector<Tile*>` | Gets all tiles in world | `local tiles = getTile()` |
| `getExtraTile(int x, int y)` | `TileExtra*` | Gets extra tile data at coordinates | `local extra = getExtraTile(10, 5)` |

### World Objects

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `getWorldObject()` | `std::list<WorldObject*>` | Gets all world objects (dropped items) | `local objects = getWorldObject()` |

### NPCs

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `getNpc()` | `std::list<NPCList*>` | Gets all NPCs in world | `local npcs = getNpc()` |

### Touch & Input

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `getTouchAtScreenPos()` | `Vector2f` | Gets touch position on screen | `local pos = getTouchAtScreenPos()` |
| `getTouchAtWorldPos()` | `Vector2f` | Gets touch position in world coordinates | `local pos = getTouchAtWorldPos()` |

### Camera Functions

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `getCamera()` | `Camera*` | Gets camera object | `local cam = getCamera()` |
| `worldToScreen(float x, float y)` | `Vector2f` | Converts world coordinates to screen | `local screenPos = worldToScreen(100, 50)` |
| `setCamera(float x, float y)` | `void` | Sets camera position | `setCamera(100, 100)` |

### Device Information

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `getMac()` | `String` | Gets device MAC address | `local mac = getMac()` |
| `getGid()` | `String` | Gets Google ID | `local gid = getGid()` |
| `randomGid()` | `void` | Generates random Google ID | `randomGid()` |
| `randomMac()` | `void` | Generates random MAC address | `randomMac()` |
| `setGid(String newGoogleID)` | `void` | Sets Google ID (max 37 chars) | `setGid("new_google_id")` |
| `setMac(String newMac)` | `void` | Sets MAC address (max 18 chars) | `setMac("AA:BB:CC:DD:EE:FF")` |

### Packet Functions

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `sendPacket(int type, String pkt)` | `void` | Sends text packet | `sendPacket(2, "action|respawn")` |
| `sendPacketRaw(bool send_to_client, TankPacketStruct packet)` | `void` | Sends raw tank packet | `sendPacketRaw(false, packet)` |
| `sendVariant(variantlist_t var, int netID, int delay)` | `void` | Sends variant list | `sendVariant(var, 0, 0)` |

### System Functions

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `getCurrentTimeInternal()` | `unsigned long` | Gets current system time | `local time = getCurrentTimeInternal()` |
| `sleep(int sleep_in_ms)` | `void` | Pauses execution for milliseconds | `sleep(1000)` |
| `getScreenSize()` | `Vector2f` | Gets screen dimensions | `local size = getScreenSize()` |

### Utility Functions

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `arrowToItem(bool isFloatingObject, int itemID_Target)` | `void` | Shows arrow pointing to item | `arrowToItem(true, 2)` |
| `getDiscordID()` | `std::string` | Gets Discord ID | `local id = getDiscordID()` |
| `checkPath(int x, int y)` | `bool` | Checks if path is available | `local canMove = checkPath(50, 23)` |
| `requestCollect(int x, int y, int itemID)` | `void` | Requests to collect item | `requestCollect(50, 23, 2)` |
| `requestTileChange(int x, int y, int item_id)` | `void` | Requests tile change | `requestTileChange(50, 23, 18)` |

### Hook Functions

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `AddHook(GentaHook, String HookLabel, function)` | `void` | Adds a hook function | `AddHook(OnTextPacket, "MyHook", func)` |
| `RemoveHooks()` | `void` | Removes all hooks | `RemoveHooks()` |
| `RemoveHook(String HookLabel)` | `void` | Removes specific hook | `RemoveHook("MyHook")` |

### UI Functions

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `doToast(int toastType, int dissMissTimeInMilliSeconds, String text)` | `void` | Shows toast message | `doToast(1, 3000, "Hello")` |
| `callToast(String text, int type)` | `void` | Shows toast (0=short, 1=long) | `callToast("Message", 1)` |

### Logging Functions

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `logToConsole(String text)` | `void` | Logs to console | `logToConsole("Debug message")` |
| `doLog(String text)` | `void` | General logging | `doLog("Info message")` |
| `doLogError(String text)` | `void` | Error level logging | `doLogError("Error occurred")` |
| `doLogInfo(String text)` | `void` | Info level logging | `doLogInfo("Information")` |

### Network Functions

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `sendWebhook(String url, DiscordWebhook)` | `void` | Sends Discord webhook | `sendWebhook(url, webhook)` |
| `makeRequest(String url, String method, std::list<String> header, String body, int connection_time_out)` | `Response` | Makes HTTP request | `local resp = makeRequest(url, "GET", {}, "", 5000)` |

### Item Database Functions

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `getItemByID(int itemID)` | `ItemInfo*` | Gets item info by ID | `local item = getItemByID(2)` |
| `getItemByName(String itemName)` | `ItemInfo*` | Gets item info by name | `local item = getItemByName("Dirt")` |

### Cheat Functions

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `getCheat(int cheat_code)` | `bool` | Gets cheat status | `local enabled = getCheat(1)` |
| `toggleCheat(int cheat_code, bool state)` | `void` | Toggle cheat on/off | `toggleCheat(1, true)` |

### Movement Functions

| Function | Return Type | Description | Example |
|----------|-------------|-------------|---------|
| `findPath(int x, int y)` | `bool` | Finds path to coordinates | `local canReach = findPath(50, 23)` |

---

## Data Structures

### TankPacketStruct
| Type | Attribute | Description |
|------|-----------|-------------|
| `uint8_t` | `type` | Packet type |
| `uint8_t` | `padding1` | Padding byte 1 |
| `uint8_t` | `padding2` | Padding byte 2 |
| `uint8_t` | `padding3` | Padding byte 3 |
| `int` | `netid` | Network ID |
| `int` | `secid` | Secondary ID |
| `int` | `state` | State value |
| `float` | `padding4` | Padding float |
| `int` | `value` | Value field |
| `float` | `x` | X coordinate |
| `float` | `y` | Y coordinate |
| `float` | `speedx` | X speed |
| `float` | `speedy` | Y speed |
| `int` | `padding5` | Padding int |
| `int` | `punchx` | Punch X coordinate |
| `int` | `punchy` | Punch Y coordinate |

### Response
| Type | Attribute | Description |
|------|-----------|-------------|
| `String` | `content` | Response content |

### Camera
| Type | Attribute | Description |
|------|-----------|-------------|
| `float` | `scale` | Camera scale |
| `Vector2f` | `pos` | Camera position |
| `Vector2f` | `center` | Camera center |

### NetAvatar
| Type | Attribute | Description |
|------|-----------|-------------|
| `Vector2i` | `pos` | Player position |
| `std::string` | `name` | Player name |
| `std::string` | `country` | Player country |
| `int` | `userId` | User ID |
| `int` | `status` | Player status |
| `int` | `netId` | Network ID |
| `bool` | `facing` | Facing direction |
| `uint32_t` | `hair` | Hair item ID |
| `uint32_t` | `shirt` | Shirt item ID |
| `uint32_t` | `pants` | Pants item ID |
| `uint32_t` | `feet` | Feet item ID |
| `uint32_t` | `face` | Face item ID |
| `uint32_t` | `hand` | Hand item ID |
| `uint32_t` | `back` | Back item ID |
| `uint32_t` | `mask` | Mask item ID |
| `uint32_t` | `necklace` | Necklace item ID |
| `int` | `ping` | Player ping |
| `uint8_t` | `punchId` | Punch ID |
| `int` | `gemsCollected` | Gems collected |
| `int` | `gems` | Current gems |
| `Vector4i` | `skinColor` | Skin color |
| `Vector4i` | `quickSlot` | Quick slot items |
| `int` | `backpackSlot` | Backpack slots |
| `uint32_t` | `selectedItem` | Selected item ID |

### TileExtra
| Type | Attribute | Description |
|------|-----------|-------------|
| `bool` | `valid` | Is tile extra valid |
| `int` | `type` | Extra type |
| `int` | `growth` | Growth time |
| `int` | `owner` | Owner user ID |
| `int` | `flags` | Extra flags |
| `std::list<uint32_t>` | `adminList` | Admin list |
| `bool` | `ready` | Is ready |
| `std::string` | `label` | Label text |
| `std::string` | `padding1` | Padding string |
| `int` | `volume` | Volume level |
| `int` | `fruitCount` | Fruit count |
| `int` | `lastUpdate` | Last update time |

### World
| Type | Attribute | Description |
|------|-----------|-------------|
| `String` | `name` | World name |
| `uint8_t` | `width` | World width |
| `uint8_t` | `height` | World height |
| `int` | `lastOid` | Last object ID |

### Tile
| Type | Attribute | Description |
|------|-----------|-------------|
| `Vector2i` | `pos` | Tile position |
| `uint16_t` | `fg` | Foreground item ID |
| `uint16_t` | `bg` | Background item ID |
| `bool` | `isCollideable` | Is collideable |
| `int` | `collisionType` | Collision type |
| `int` | `flags` | Tile flags |
| `TileFlag` | `getFlags` | Get tile flags |

### TileFlag
| Type | Attribute | Description |
|------|-----------|-------------|
| `bool` | `locked` | Is locked |
| `bool` | `area` | Is area |
| `bool` | `flipped` | Is flipped |
| `bool` | `enabled` | Is enabled |
| `bool` | `public` | Is public |
| `bool` | `silenced` | Is silenced |
| `bool` | `water` | Has water |
| `bool` | `glue` | Has glue |
| `bool` | `burn` | Is burning |
| `bool` | `painted` | Is painted |

### ItemInfo
| Type | Attribute | Description |
|------|-----------|-------------|
| `std::string` | `name` | Item name |
| `int` | `actionType` | Action type |
| `int` | `rarity` | Item rarity |
| `int` | `growth` | Growth time |
| `std::string` | `texture` | Texture name |
| `std::string` | `texture_2` | Second texture |
| `int` | `editableType` | Editable type |
| `int` | `collisionType` | Collision type |
| `int` | `itemCategory` | Item category |
| `Vector2i` | `texturePos` | Texture position |
| `int` | `clothType` | Cloth type |
| `int` | `blockType` | Block type |
| `int` | `hitSoundType` | Hit sound type |

### WorldObject
| Type | Attribute | Description |
|------|-----------|-------------|
| `int` | `id` | Object item ID |
| `int` | `amount` | Item amount |
| `int` | `oid` | Object ID |
| `int` | `flags` | Object flags |
| `Vector2i` | `pos` | Object position |

### NPCList
| Type | Attribute | Description |
|------|-----------|-------------|
| `int` | `id` | NPC ID |
| `int` | `type` | NPC type |
| `Vector2i` | `current` | Current position |
| `Vector2i` | `target` | Target position |

### Inventory
| Type | Attribute | Description |
|------|-----------|-------------|
| `int` | `id` | Item ID |
| `uint8_t` | `amount` | Item amount |

### Vector2i / Vector2f
| Type | Attribute | Description |
|------|-----------|-------------|
| `int/float` | `x` | X coordinate |
| `int/float` | `y` | Y coordinate |

### Vector3i / Vector3f
| Type | Attribute | Description |
|------|-----------|-------------|
| `int/float` | `x` | X coordinate |
| `int/float` | `y` | Y coordinate |
| `int/float` | `z` | Z coordinate |

### Vector4i / Vector4f
| Type | Attribute | Description |
|------|-----------|-------------|
| `int/float` | `w` | W component |
| `int/float` | `x` | X component |
| `int/float` | `y` | Y component |
| `int/float` | `z` | Z component |

---

## Hook Events

| Hook | Parameters | Description |
|------|------------|-------------|
| `OnTextPacket` | `int flag, String packet` | Called when text packet is received |
| `OnVarlist` | `Variantlist_t[], int netID` | Called when variant list is received |
| `OnTouch` | `float x, float y` | Called when screen is touched |
| `OnRender` | `int deltaTime` | Called every frame |
| `OnRawPacket` | `TankPacketStruct raw` | Called when raw packet is received |
| `OnGameUpdatePacket` | `TankPacketStruct raw` | Called when game update packet is received |
| `OnENetInit` | `String ip, int port` | Called when ENet initializes |

---

## Discord Webhook Structures

### EmbedAuthor
| Type | Attribute | Description |
|------|-----------|-------------|
| `std::string` | `name` | Author name |
| `std::string` | `url` | Author URL |
| `std::string` | `icon_url` | Author icon URL |

### EmbedField
| Type | Attribute | Description |
|------|-----------|-------------|
| `std::string` | `name` | Field name |
| `std::string` | `value` | Field value |
| `bool` | `inline` | Is inline |

### EmbedURL
| Type | Attribute | Description |
|------|-----------|-------------|
| `std::string` | `url` | URL string |

### EmbedFooter
| Type | Attribute | Description |
|------|-----------|-------------|
| `std::string` | `text` | Footer text |
| `std::string` | `icon_url` | Footer icon URL |

### EmbedBuilder
| Type | Attribute | Description |
|------|-----------|-------------|
| `EmbedAuthor` | `author` | Embed author |
| `std::string` | `title` | Embed title |
| `std::string` | `url` | Embed URL |
| `std::string` | `description` | Embed description |
| `std::string` | `color` | Embed color |
| `std::list<EmbedField>` | `fields` | Embed fields |
| `EmbedURL` | `thumbnail` | Thumbnail URL |
| `EmbedURL` | `image` | Image URL |
| `EmbedFooter` | `footer` | Embed footer |

### DiscordWebhook
| Type | Attribute | Description |
|------|-----------|-------------|
| `std::string` | `username` | Webhook username |
| `std::string` | `avatar_url` | Avatar URL |
| `std::string` | `content` | Message content |
| `bool` | `useEmbeds` | Use embeds |
| `EmbedBuilder` | `embeds` | Embed data |

---

## Enumerations

### CheatCode
| Label | Value | Description |
|-------|-------|-------------|
| Fast Fruit | 0 | Fast fruit collection |
| Ghost Mode | 1 | Ghost mode |
| Night Vision | 2 | Night vision |
| Can See Ghost | 3 | See ghost players |
| Anti Bounce | 4 | Anti bounce |
| Death Anywhere | 5 | Death anywhere |
| No Clip | 6 | No collision |
| Bypass Death | 7 | Bypass death |
| Show Door Label | 8 | Show door labels |
| Show Sign Label | 9 | Show sign labels |
| Anti Portal | 10 | Anti portal |
| Dev Mode | 11 | Developer mode |
| Fast Wheel | 12 | Fast wheel |
| Real Fake Bubble | 13 | Real fake bubble |
| Show Debug | 14 | Show debug info |
| Anti State | 15 | Anti state |
| No Particle | 16 | No particles |
| Path Finder | 17 | Path finder |
| Skip Update | 18 | Skip update |
| Anti Tile Activation | 19 | Anti tile activation |
| Anti Respawn | 20 | Anti respawn |
| Anti Freeze State | 21 | Anti freeze state |
| Can't Take Item | 22 | Can't take items |
| Can't move | 23 | Can't move |
| Fast Dice | 24 | Fast dice |
| Auto Acc | 25 | Auto access |
| Mod Fly | 26 | Mod fly |
| Extractor Dynamo | 27 | Extractor dynamo |
| Anti OnKilled | 28 | Anti on killed |
| No Render Image | 29 | No render image |
| Free Camera | 30 | Free camera |
| Show Ready Harvest | 31 | Show ready harvest |

### Toast Type
| Label | Value | Description |
|-------|-------|-------------|
| ImGuiToastType_None | 0 | No toast |
| ImGuiToastType_Success | 1 | Success toast |
| ImGuiToastType_Warning | 2 | Warning toast |
| ImGuiToastType_Error | 3 | Error toast |
| ImGuiToastType_Info | 4 | Info toast |

### ENet Packet Flag
| Label | Value | Description |
|-------|-------|-------------|
| ENET_PACKET_FLAG_RELIABLE | 0 | Reliable packet |
| ENET_PACKET_FLAG_UNSEQUENCED | 1 | Unsequenced packet |
| ENET_PACKET_FLAG_NO_ALLOCATE | 2 | No allocate packet |
| ENET_PACKET_FLAG_UNRELIABLE_FRAGMENT | 3 | Unreliable fragment |
| ENET_PACKET_FLAG_SENT | 8 | Sent packet |

### Growtopia Raw Packet Type
| Label | Value | Description |
|-------|-------|-------------|
| PACKET_STATE | 0 | State packet |
| PACKET_CALL_FUNCTION | 1 | Call function packet |
| PACKET_UPDATE_STATUS | 2 | Update status packet |
| PACKET_TILE_CHANGE_REQUEST | 3 | Tile change request |
| PACKET_SEND_MAP_DATA | 4 | Send map data |
| PACKET_SEND_TILE_UPDATE_DATA | 5 | Send tile update data |
| PACKET_SEND_TILE_UPDATE_DATA_MULTIPLE | 6 | Send multiple tile updates |
| PACKET_TILE_ACTIVATE_REQUEST | 7 | Tile activate request |
| PACKET_TILE_APPLY_DAMAGE | 8 | Tile apply damage |
| PACKET_SEND_INVENTORY_STATE | 9 | Send inventory state |
| PACKET_ITEM_ACTIVATE_REQUEST | 10 | Item activate request |
| PACKET_ITEM_ACTIVATE_OBJECT_REQUEST | 11 | Item activate object request |
| PACKET_SEND_TILE_TREE_STATE | 12 | Send tile tree state |
| PACKET_MODIFY_ITEM_INVENTORY | 13 | Modify item inventory |
| PACKET_ITEM_CHANGE_OBJECT | 14 | Item change object |
| PACKET_SEND_LOCK | 15 | Send lock |
| PACKET_SEND_ITEM_DATABASE_DATA | 16 | Send item database data |
| PACKET_SEND_PARTICLE_EFFECT | 17 | Send particle effect |
| PACKET_SET_ICON_STATE | 18 | Set icon state |
| PACKET_ITEM_EFFECT | 19 | Item effect |
| PACKET_SET_CHARACTER_STATE | 20 | Set character state |
| PACKET_PING_REPLY | 21 | Ping reply |
| PACKET_PING_REQUEST | 22 | Ping request |
| PACKET_GOT_PUNCHED | 23 | Got punched |
| PACKET_APP_CHECK_RESPONSE | 24 | App check response |
| PACKET_APP_INTEGRITY_FAIL | 25 | App integrity fail |
| PACKET_DISCONNECT | 26 | Disconnect |
| PACKET_BATTLE_JOIN | 27 | Battle join |
| PACKET_BATTLE_EVEN | 28 | Battle even |
| PACKET_USE_DOOR | 29 | Use door |
| PACKET_SEND_PARENTAL | 30 | Send parental |
| PACKET_GONE_FISHIN | 31 | Gone fishin |
| PACKET_STEAM | 32 | Steam |
| PACKET_PET_BATTLE | 33 | Pet battle |
| PACKET_NPC | 34 | NPC |
| PACKET_SPECIAL | 35 | Special |
| PACKET_SEND_PARTICLE_EFFECT_V2 | 36 | Send particle effect v2 |
| GAME_ACTIVE_ARROW_TO_ITEM | 37 | Game active arrow to item |
| GAME_SELECT_TILE_INDEX | 38 | Game select tile index |