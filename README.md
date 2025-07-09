# 🚀 GENTA HAX - Android Lua Documentation

[![Discord](https://img.shields.io/discord/870604052281573406)](https://discord.gg/JTM9b6XR3A)

> **📋 Prerequisites:** Before diving in, ensure you have basic knowledge of Lua scripting. You can learn the fundamentals [here](https://lua.org/docs.html).

This documentation covers custom data types such as `ImVec2`, `ImVec4`, `Vector2f`, `Vector3i`, and more. Understanding Lua basics is essential for effective script development.

## 📁 File Location
```
Android/media/GENTAHAX/Script/here.lua
```

## 🔗 Resources
- **[ImGui](https://github.com/ocornut/imgui)** - Immediate Mode GUI
- **[Lua](https://lua.org)** - Programming Language
- **[OpenSSL](https://www.openssl.org/)** - Cryptography Library
- **[Growtopia](https://www.growtopiagame.com/)** - Game Platform

---

## 🔧 Functions & Methods

### 👤 Player Management

#### Getting Player Information
```lua
NetAvatar* getLocal()                    -- Get local player
NetAvatar* getPlayerByNetID(int netid)   -- Get player by network ID
std::list<NetAvatar*> getPlayerlist()   -- Get all players
```

#### Setting Player Information
```lua
void setPlayer(NetAvatar*)               -- ⚠️ Deprecated
```

### 🎒 Inventory Management

#### Getting Inventory
```lua
std::list<Inventory*> getInventory()     -- Get player inventory
```

#### Setting Inventory
```lua
void addItem(int itemID, uint8_t amount) -- ⚠️ Deprecated
```

### 🌍 World Management

#### Getting World Information
```lua
World* getWorld()                        -- Get current world
```

#### Getting World Tiles
```lua
Tile* checkTile(int x, int y)           -- Check specific tile
std::vector<Tile*> getTile()            -- Get all tiles
TileExtra* getExtraTile(int x, int y)   -- Get tile extra data
```

#### Getting World Objects
```lua
std::list<WorldObject*> getWorldObject() -- Get all world objects
```

#### Getting World NPCs
```lua
std::list<NPCList*> getNpc()            -- Get all NPCs
```

### 🎮 Game Controls

#### Touch Input
```lua
Vector2f getTouchAtScreenPos()          -- Get touch position (screen)
Vector2f getTouchAtWorldPos()           -- Get touch position (world)
```

#### Camera Controls
```lua
Camera* getCamera()                     -- Get camera instance
Vector2f worldToScreen(float x, float y) -- Convert world to screen coordinates
void setCamera(float x, float y)        -- Set camera position
```

### 📱 Device Information

#### Getting Device Info
```lua
String getMac()                         -- Get MAC address
String getGid()                         -- Get Google ID
```

#### Setting Device Info
```lua
void randomGid()                        -- Generate random Google ID
void randomMac()                        -- Generate random MAC
void setGid(String newGoogleID)         -- Set Google ID (max 37 chars)
void setMac(String newMac)              -- Set MAC address (max 18 chars)
```

### 📡 Network Communication

#### Packet Management
```lua
void sendPacket(int type, String pkt)                           -- Send packet
void sendPacketRaw(bool send_to_client, TankPacketStruct packet) -- Send raw packet
void sendVariant(variantlist_t var, int netID, int delay)       -- Send variant
```

### ⏰ System Utilities

#### Timing
```lua
unsigned long getCurrentTimeInternal()   -- Get current system time
void sleep(int sleep_in_ms)             -- Sleep for specified milliseconds
```

#### Useful APIs
```lua
void arrowToItem(bool isFloatingObject, int itemID_Target)      -- Point arrow to item
std::string getDiscordID()                                      -- Get Discord ID
bool checkPath(int x, int y)                                    -- Check if path exists
void requestCollect(int x, int y, int itemID)                  -- Request item collection
void requestTileChange(int x, int y, int item_id)              -- Request tile change
Vector2f getScreenSize()                                        -- Get screen dimensions
```

#### Hook Management
```lua
void AddHook(GentaHook, String HookLabel, function)            -- Add hook
void RemoveHooks()                                              -- Remove all hooks
void RemoveHook(String HookLabel)                              -- Remove specific hook
```

#### User Interface
```lua
void doToast(int toastType, int dissMissTimeInMilliSeconds, String text) -- Show toast
void callToast(String text, int type)                                    -- Show toast (Java style)
```

### 📝 Logging

```lua
void logToConsole(String text)          -- Log to console
void doLog(String text)                 -- General logging
void doLogError(String text)            -- Error logging
void doLogInfo(String text)             -- Info logging
```

### 🌐 Network Requests

```lua
void sendWebhook(String url, DiscordWebhook)                                           -- Send Discord webhook
Response makeRequest(String url, String method, std::list<String> header, String body, int connection_time_out) -- Make HTTP request
```

### 🗃️ Item Database

```lua
ItemInfo* getItemByID(int itemID)       -- Get item by ID
ItemInfo* getItemByName(String itemName) -- Get item by name
```

### 🎯 Cheat System

```lua
bool getCheat(int cheat_code)           -- Get cheat state
void toggleCheat(int cheat_code, bool state) -- Toggle cheat
```

### 🚶 Movement

```lua
bool findPath(int x, int y)             -- Find path to coordinates
```

---

## 📊 Data Structures

### 🎯 TankPacketStruct
| Type | Attribute | Description |
|------|-----------|-------------|
| `uint8_t` | `type` | Packet type |
| `uint8_t` | `padding1` | Padding |
| `uint8_t` | `padding2` | Padding |
| `uint8_t` | `padding3` | Padding |
| `int` | `netid` | Network ID |
| `int` | `secid` | Secondary ID |
| `int` | `state` | State |
| `float` | `padding4` | Padding |
| `int` | `value` | Value |
| `float` | `x` | X coordinate |
| `float` | `y` | Y coordinate |
| `float` | `speedx` | X speed |
| `float` | `speedy` | Y speed |
| `int` | `padding5` | Padding |
| `int` | `punchx` | Punch X |
| `int` | `punchy` | Punch Y |

### 📷 Camera
| Type | Attribute | Description |
|------|-----------|-------------|
| `float` | `scale` | Camera scale |
| `Vector2f` | `pos` | Camera position |
| `Vector2f` | `center` | Camera center |

### 🌐 Response
| Type | Attribute | Description |
|------|-----------|-------------|
| `String` | `content` | Response content |

### 👤 NetAvatar
| Type | Attribute | Description |
|------|-----------|-------------|
| `Vector2i` | `pos` | Position |
| `std::string` | `name` | Player name |
| `std::string` | `country` | Country |
| `int` | `userId` | User ID |
| `int` | `status` | Status |
| `int` | `netId` | Network ID |
| `bool` | `facing` | Facing direction |
| `uint32_t` | `hair` | Hair item |
| `uint32_t` | `shirt` | Shirt item |
| `uint32_t` | `pants` | Pants item |
| `uint32_t` | `feet` | Feet item |
| `uint32_t` | `face` | Face item |
| `uint32_t` | `hand` | Hand item |
| `uint32_t` | `back` | Back item |
| `uint32_t` | `mask` | Mask item |
| `uint32_t` | `necklace` | Necklace item |
| `int` | `ping` | Ping |
| `uint8_t` | `punchId` | Punch ID |
| `int` | `gemsCollected` | Gems collected |
| `int` | `gems` | Current gems |
| `Vector4i` | `skinColor` | Skin color |
| `Vector4i` | `quickSlot` | Quick slot |
| `int` | `backpackSlot` | Backpack slot |
| `uint32_t` | `selectedItem` | Selected item |

### 🧩 TileExtra
| Type | Attribute | Description |
|------|-----------|-------------|
| `bool` | `valid` | Is valid |
| `int` | `type` | Type |
| `int` | `growth` | Growth |
| `int` | `owner` | Owner |
| `int` | `flags` | Flags |
| `std::list<uint32_t>` | `adminList` | Admin list |
| `bool` | `ready` | Ready state |
| `std::string` | `label` | Label |
| `std::string` | `padding1` | Padding |
| `int` | `volume` | Volume |
| `int` | `fruitCount` | Fruit count |
| `int` | `lastUpdate` | Last update |

### 🌍 World
| Type | Attribute | Description |
|------|-----------|-------------|
| `String` | `name` | World name |
| `uint8_t` | `width` | World width |
| `uint8_t` | `height` | World height |
| `int` | `lastOid` | Last object ID |

### 🟫 Tile
| Type | Attribute | Description |
|------|-----------|-------------|
| `Vector2i` | `pos` | Position |
| `uint16_t` | `fg` | Foreground |
| `uint16_t` | `bg` | Background |
| `bool` | `isCollideable` | Collideable |
| `int` | `collisionType` | Collision type |
| `int` | `flags` | Flags |
| `TileFlag` | `getFlags` | Get flags |

### 🚩 TileFlag
| Type | Attribute | Description |
|------|-----------|-------------|
| `bool` | `locked` | Locked |
| `bool` | `area` | Area |
| `bool` | `flipped` | Flipped |
| `bool` | `enabled` | Enabled |
| `bool` | `public` | Public |
| `bool` | `silenced` | Silenced |
| `bool` | `water` | Water |
| `bool` | `glue` | Glue |
| `bool` | `burn` | Burn |
| `bool` | `painted` | Painted |

### 📦 ItemInfo
| Type | Attribute | Description |
|------|-----------|-------------|
| `std::string` | `name` | Item name |
| `int` | `actionType` | Action type |
| `int` | `rarity` | Rarity |
| `int` | `growth` | Growth |
| `std::string` | `texture` | Texture |
| `std::string` | `texture_2` | Second texture |
| `int` | `editableType` | Editable type |
| `int` | `collisionType` | Collision type |
| `int` | `itemCategory` | Item category |
| `Vector2i` | `texturePos` | Texture position |
| `int` | `clothType` | Cloth type |
| `int` | `blockType` | Block type |
| `int` | `hitSoundType` | Hit sound type |

### 🎯 WorldObject
| Type | Attribute | Description |
|------|-----------|-------------|
| `int` | `id` | Object ID |
| `int` | `amount` | Amount |
| `int` | `oid` | Object instance ID |
| `int` | `flags` | Flags |
| `Vector2i` | `pos` | Position |

### 🤖 NPCList
| Type | Attribute | Description |
|------|-----------|-------------|
| `int` | `id` | NPC ID |
| `int` | `type` | NPC type |
| `Vector2i` | `current` | Current position |
| `Vector2i` | `target` | Target position |

### 🎒 Inventory
| Type | Attribute | Description |
|------|-----------|-------------|
| `int` | `id` | Item ID |
| `uint8_t` | `amount` | Item amount |

### 📐 Vector Types

#### Vector2i / Vector2f
| Type | Attribute |
|------|-----------|
| `int/float` | `x` |
| `int/float` | `y` |

#### Vector3i / Vector3f
| Type | Attribute |
|------|-----------|
| `int/float` | `x` |
| `int/float` | `y` |
| `int/float` | `z` |

#### Vector4i / Vector4f
| Type | Attribute |
|------|-----------|
| `int/float` | `w` |
| `int/float` | `x` |
| `int/float` | `y` |
| `int/float` | `z` |

---

## 🔗 Hook System

### Available Hooks
| Hook Name | Parameters | Description |
|-----------|------------|-------------|
| `OnTextPacket` | `int flag, String packet` | Text packet received |
| `OnVarlist` | `Variantlist_t[], int netID` | Variant list received |
| `OnTouch` | `float x, float y` | Touch event |
| `OnRender` | `int deltaTime` | Render event |
| `OnRawPacket` | `TankPacketStruct raw` | Raw packet received |
| `OnGameUpdatePacket` | `TankPacketStruct raw` | Game update packet |
| `OnENetInit` | `String ip, int port` | ENet initialization |

---

## 🎮 Discord Webhook System

### EmbedAuthor
| Type | Attribute |
|------|-----------|
| `std::string` | `name` |
| `std::string` | `url` |
| `std::string` | `icon_url` |

### EmbedField
| Type | Attribute |
|------|-----------|
| `std::string` | `name` |
| `std::string` | `value` |
| `bool` | `inline` |

### EmbedURL
| Type | Attribute |
|------|-----------|
| `std::string` | `url` |

### EmbedFooter
| Type | Attribute |
|------|-----------|
| `std::string` | `text` |
| `std::string` | `icon_url` |

### EmbedBuilder
| Type | Attribute |
|------|-----------|
| `EmbedAuthor` | `author` |
| `std::string` | `title` |
| `std::string` | `url` |
| `std::string` | `description` |
| `std::string` | `color` |
| `std::list<EmbedField>` | `fields` |
| `EmbedURL` | `thumbnail` |
| `EmbedURL` | `image` |
| `EmbedFooter` | `footer` |

### DiscordWebhook
| Type | Attribute |
|------|-----------|
| `std::string` | `username` |
| `std::string` | `avatar_url` |
| `std::string` | `content` |
| `bool` | `useEmbeds` |
| `EmbedBuilder` | `embeds` |

---

## 📋 Enumerations

### 🎯 CheatCode
| Cheat Name | Value | Description |
|------------|-------|-------------|
| Fast Fruit | 0 | Faster fruit collection |
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
| No Particle | 16 | No particle effects |
| Path Finder | 17 | Path finder |
| Skip Update | 18 | Skip update |
| Anti Tile Activation | 19 | Anti tile activation |
| Anti Respawn | 20 | Anti respawn |
| Anti Freeze State | 21 | Anti freeze state |
| Can't Take Item | 22 | Can't take items |
| Can't Move | 23 | Can't move |
| Fast Dice | 24 | Fast dice |
| Auto Acc | 25 | Auto access |
| Mod Fly | 26 | Mod fly |
| Extractor Dynamo | 27 | Extractor dynamo |
| Anti OnKilled | 28 | Anti on killed |
| No Render Image | 29 | No render image |
| Free Camera | 30 | Free camera |
| Show Ready Harvest | 31 | Show ready harvest |

### 🍞 Toast Types
| Type | Value | Description |
|------|-------|-------------|
| `ImGuiToastType_None` | 0 | No toast |
| `ImGuiToastType_Success` | 1 | Success toast |
| `ImGuiToastType_Warning` | 2 | Warning toast |
| `ImGuiToastType_Error` | 3 | Error toast |
| `ImGuiToastType_Info` | 4 | Info toast |

### 🌐 ENet Packet Flags
| Flag | Value | Description |
|------|-------|-------------|
| `ENET_PACKET_FLAG_RELIABLE` | 0 | Reliable packet |
| `ENET_PACKET_FLAG_UNSEQUENCED` | 1 | Unsequenced packet |
| `ENET_PACKET_FLAG_NO_ALLOCATE` | 2 | No allocate packet |
| `ENET_PACKET_FLAG_UNRELIABLE_FRAGMENT` | 3 | Unreliable fragment |
| `ENET_PACKET_FLAG_SENT` | 8 | Sent packet |

### 📦 Growtopia Packet Types
| Packet Type | Value | Description |
|-------------|-------|-------------|
| `PACKET_STATE` | 0 | State packet |
| `PACKET_CALL_FUNCTION` | 1 | Call function |
| `PACKET_UPDATE_STATUS` | 2 | Update status |
| `PACKET_TILE_CHANGE_REQUEST` | 3 | Tile change request |
| `PACKET_SEND_MAP_DATA` | 4 | Send map data |
| `PACKET_SEND_TILE_UPDATE_DATA` | 5 | Send tile update |
| `PACKET_SEND_TILE_UPDATE_DATA_MULTIPLE` | 6 | Send multiple tile updates |
| `PACKET_TILE_ACTIVATE_REQUEST` | 7 | Tile activate request |
| `PACKET_TILE_APPLY_DAMAGE` | 8 | Tile apply damage |
| `PACKET_SEND_INVENTORY_STATE` | 9 | Send inventory state |
| `PACKET_ITEM_ACTIVATE_REQUEST` | 10 | Item activate request |
| `PACKET_ITEM_ACTIVATE_OBJECT_REQUEST` | 11 | Item activate object request |
| `PACKET_SEND_TILE_TREE_STATE` | 12 | Send tile tree state |
| `PACKET_MODIFY_ITEM_INVENTORY` | 13 | Modify item inventory |
| `PACKET_ITEM_CHANGE_OBJECT` | 14 | Item change object |
| `PACKET_SEND_LOCK` | 15 | Send lock |
| `PACKET_SEND_ITEM_DATABASE_DATA` | 16 | Send item database data |
| `PACKET_SEND_PARTICLE_EFFECT` | 17 | Send particle effect |
| `PACKET_SET_ICON_STATE` | 18 | Set icon state |
| `PACKET_ITEM_EFFECT` | 19 | Item effect |
| `PACKET_SET_CHARACTER_STATE` | 20 | Set character state |
| `PACKET_PING_REPLY` | 21 | Ping reply |
| `PACKET_PING_REQUEST` | 22 | Ping request |
| `PACKET_GOT_PUNCHED` | 23 | Got punched |
| `PACKET_APP_CHECK_RESPONSE` | 24 | App check response |
| `PACKET_APP_INTEGRITY_FAIL` | 25 | App integrity fail |
| `PACKET_DISCONNECT` | 26 | Disconnect |
| `PACKET_BATTLE_JOIN` | 27 | Battle join |
| `PACKET_BATTLE_EVEN` | 28 | Battle even |
| `PACKET_USE_DOOR` | 29 | Use door |
| `PACKET_SEND_PARENTAL` | 30 | Send parental |
| `PACKET_GONE_FISHIN` | 31 | Gone fishing |
| `PACKET_STEAM` | 32 | Steam |
| `PACKET_PET_BATTLE` | 33 | Pet battle |
| `PACKET_NPC` | 34 | NPC |
| `PACKET_SPECIAL` | 35 | Special |
| `PACKET_SEND_PARTICLE_EFFECT_V2` | 36 | Send particle effect v2 |
| `GAME_ACTIVE_ARROW_TO_ITEM` | 37 | Game active arrow to item |
| `GAME_SELECT_TILE_INDEX` | 38 | Game select tile index |

---

## 💡 Tips for Usage

1. **Always check return values** - Many functions return pointers that could be null
2. **Use hooks wisely** - Remove hooks when not needed to prevent memory leaks
3. **Handle errors gracefully** - Use try-catch blocks for network operations
4. **Optimize performance** - Avoid calling expensive functions in render loops
5. **Test thoroughly** - Always test your scripts in a safe environment first

---

*Happy scripting! 🎉*