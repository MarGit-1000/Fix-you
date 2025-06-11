var items_secret_key = "PBG892FXX982ABC*";
var data_json = {};
var encoded_buffer_file = [];

const byteToHex = [];
function check_last_char(dest, src) {
    return dest[dest.length - 1] == src
}
// Helper konversi byte ke hex (dipindah ke atas)
for (let n = 0; n <= 0xff; ++n) {
    byteToHex[n] = n.toString(16).padStart(2, "0");
}

function hexStringToArrayBuffer(pos, hexString) {
    // remove the space
    hexString = hexString.replace(/ /g, '');
    if (hexString.length % 2 != 0) {
        throw new Error('Invalid hex string length');
    }

    // check for some non-hex characters
    var bad = hexString.match(/[G-Z\s]/i);
    if (bad) {
        throw new Error('Invalid hex characters found');
    }

    // convert the octets to integers
    const bytes = hexString.match(/[\dA-F]{2}/gi);
    if (!bytes) {
        throw new Error('Invalid hex string format');
    }

    for (let i = 0; i < bytes.length; i++) {
        encoded_buffer_file[pos + i] = parseInt(bytes[i], 16);
    }
}
function write_buffer_number(pos, len, value) {
    for (let a = 0; a < len; a++) {
        encoded_buffer_file[pos + a] = (value >> (a * 8)) & 255;
    }
}
// Konversi ArrayBuffer ke HEX string
function hex(arrayBuffer, is_without_space) {
    const buff = new Uint8Array(arrayBuffer);
    const hexOctets = [];
    for (let i = 0; i < buff.length; ++i)
        hexOctets.push(byteToHex[buff[i]]);
    return hexOctets.join(is_without_space ? "" : " ");
}
var saveDataBuffer = (function () {
    var a = document.createElement('a');
    a.style = "display: none";
    document.body.appendChild(a);
    
    return function (data, fileName) {
        // Hanya menggunakan data yang valid (menghindari buffer kosong)
        const actualLength = data.findIndex(val => val === undefined);
        const validData = actualLength === -1 ? data : data.slice(0, actualLength);
        
        const blob = new Blob([new Uint8Array(validData)], { type: "octet/stream" });
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());
// Membaca bilangan dari buffer (little-endian)
function read_buffer_number(buffer, pos, len) {
    let value = 0;
    for (let a = 0; a < len; a++)
        value += buffer[pos + a] << (a * 8);
    return value;
}

// Membaca string dari buffer (dengan/atau tanpa XOR-key)
function read_buffer_string(buffer, pos, len, using_key = false, item_id = 0) {
    var result = "";
    if (using_key) {
        for (let a = 0; a < len; a++) {
            result += String.fromCharCode(
                buffer[a + pos] ^ items_secret_key.charCodeAt((item_id + a) % items_secret_key.length)
            );
        }
    } else {
        for (let a = 0; a < len; a++) {
            result += String.fromCharCode(buffer[a + pos]);
        }
    }
    return result;
}

// Fungsi untuk menyimpan file (diperbaiki)
const a = document.createElement("a");
a.style.display = "none";
document.body.appendChild(a);

const saveData = function (data, fileName) {
    const blob = new Blob([data], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
};


/**
 * @param {ArrayBuffer} buffer
 * @param {number} pos
 * @param {number} len
 * @param {boolean} using_key
 * @param {number} item_id
 */


function write_buffer_string(pos, len, value, using_key, item_id) {
    for (let a = 0; a < len; a++) {
        if (using_key) encoded_buffer_file[pos + a] = value.charCodeAt(a) ^ (items_secret_key.charCodeAt((a + item_id) % items_secret_key.length))
        else encoded_buffer_file[pos + a] = value.charCodeAt(a)
    }
}

function process_item_encoder(result, using_txt) {
    // Reset buffer di awal untuk memastikan bersih
    encoded_buffer_file = [];
    var mem_pos = 6;
    
    // Sisa kode tetap sama...

    if (using_txt) {
        var version = 0;
        result = result.split("\n");

        for (let a = 0; a < result.length; a++) {
            var result1 = result[a].split("\\")
            if (result1[0] == "version") {
                version = Number(result1[1])
                write_buffer_number(0, 2, Number(result1[1]))
            }
            else if (result1[0] == "itemCount") write_buffer_number(2, 4, Number(result1[1]))
            else if (result1[0] == "add_item") {
                // item id
                write_buffer_number(mem_pos, 4, result1[1]);
                mem_pos += 4;

                encoded_buffer_file[mem_pos++] = Number(result1[2]); // editable type
                encoded_buffer_file[mem_pos++] = Number(result1[3]); // item category
                encoded_buffer_file[mem_pos++] = Number(result1[4]); // action type
                encoded_buffer_file[mem_pos++] = Number(result1[5]); // hit sound type

                // name
                write_buffer_number(mem_pos, 2, result1[6].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[6].length, result1[6], 1, Number(result1[1]))
                mem_pos += result1[6].length

                // texture
                write_buffer_number(mem_pos, 2, result1[7].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[7].length, result1[7])
                mem_pos += result1[7].length

                // texture hash
                write_buffer_number(mem_pos, 4, result1[8])
                mem_pos += 4;

                encoded_buffer_file[mem_pos++] = Number(result1[9]) // item kind

                // val1
                write_buffer_number(mem_pos, 4, result1[10])
                mem_pos += 4;

                encoded_buffer_file[mem_pos++] = Number(result1[11]) // texture x
                encoded_buffer_file[mem_pos++] = Number(result1[12]) // texture y
                encoded_buffer_file[mem_pos++] = Number(result1[13]) // spread type
                encoded_buffer_file[mem_pos++] = Number(result1[14]) // is stripey wallpaper
                encoded_buffer_file[mem_pos++] = Number(result1[15]) // collision type

                // break hits
                if (result1[16].includes("r")) encoded_buffer_file[mem_pos++] = Number(result1[16].slice(0, -1))
                else encoded_buffer_file[mem_pos++] = Number(result1[16]) * 6

                // drop chance
                write_buffer_number(mem_pos, 4, result1[17])
                mem_pos += 4;

                encoded_buffer_file[mem_pos++] = Number(result1[18]) // clothing type

                // rarity
                write_buffer_number(mem_pos, 2, result1[19])
                mem_pos += 2;

                encoded_buffer_file[mem_pos++] = Number(result1[20]) // max amount

                // extra file
                write_buffer_number(mem_pos, 2, result1[21].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[21].length, result1[21])
                mem_pos += result1[21].length

                // extra file hash
                write_buffer_number(mem_pos, 4, result1[22])
                mem_pos += 4;

                // audio volume
                write_buffer_number(mem_pos, 4, result1[23])
                mem_pos += 4;

                // pet name
                write_buffer_number(mem_pos, 2, result1[24].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[24].length, result1[24])
                mem_pos += result1[24].length

                // pet prefix
                write_buffer_number(mem_pos, 2, result1[25].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[25].length, result1[25])
                mem_pos += result1[25].length

                // pet suffix
                write_buffer_number(mem_pos, 2, result1[26].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[26].length, result1[26])
                mem_pos += result1[26].length

                // pet ability
                write_buffer_number(mem_pos, 2, result1[27].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[27].length, result1[27])
                mem_pos += result1[27].length

                encoded_buffer_file[mem_pos++] = Number(result1[28]) // seed base
                encoded_buffer_file[mem_pos++] = Number(result1[29]) // seed overlay
                encoded_buffer_file[mem_pos++] = Number(result1[30]) // tree base
                encoded_buffer_file[mem_pos++] = Number(result1[31]) // tree leaves

                // seed color (ARGB)
                var to_object = result1[32].split(",")
                encoded_buffer_file[mem_pos++] = to_object[0] // seed color (A)
                encoded_buffer_file[mem_pos++] = to_object[1] // seed color (R)
                encoded_buffer_file[mem_pos++] = to_object[2] // seed color (G)
                encoded_buffer_file[mem_pos++] = to_object[3] // seed color (B)

                // seed overlay color (ARGB)
                to_object = result1[33].split(",")
                encoded_buffer_file[mem_pos++] = to_object[0] // seed color overlay (A)
                encoded_buffer_file[mem_pos++] = to_object[1] // seed color overlay (A)
                encoded_buffer_file[mem_pos++] = to_object[2] // seed color overlay (A)
                encoded_buffer_file[mem_pos++] = to_object[3] // seed color overlay (A)

                // ingredients (Skip)
                write_buffer_number(mem_pos, 4, 0);
                mem_pos += 4;

                // grow time
                write_buffer_number(mem_pos, 4, result1[34]);
                mem_pos += 4;

                // val2
                write_buffer_number(mem_pos, 2, result1[35]);
                mem_pos += 2;

                // is rayman
                write_buffer_number(mem_pos, 2, result1[36]);
                mem_pos += 2;

                // extra options
                write_buffer_number(mem_pos, 2, result1[37].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[37].length, result1[37])
                mem_pos += result1[37].length

                // texture2
                write_buffer_number(mem_pos, 2, result1[38].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[38].length, result1[38])
                mem_pos += result1[38].length

                // extra options2
                write_buffer_number(mem_pos, 2, result1[39].length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result1[39].length, result1[39])
                mem_pos += result1[39].length

                // Data (Position 80)
                hexStringToArrayBuffer(mem_pos, result1[40])
                mem_pos += 80;

                if (version >= 11) {
                    // punch options
                    write_buffer_number(mem_pos, 2, result1[41].length);
                    mem_pos += 2;
                    write_buffer_string(mem_pos, result1[41].length, result1[41])
                    mem_pos += result1[41].length
                }
                if (version >= 12) {
                    hexStringToArrayBuffer(mem_pos, result1[42])
                    mem_pos += 13;
                }
                if (version >= 13) {
                    write_buffer_number(mem_pos, 4, result1[43])
                    mem_pos += 4;
                }
                if (version >= 14) {
                    write_buffer_number(mem_pos, 4, result1[44])
                    mem_pos += 4;
                }
                if (version >= 15) {
                    hexStringToArrayBuffer(mem_pos, result1[45])
                    mem_pos += 25;
                    write_buffer_number(mem_pos, 2, result1[46].length);
                    mem_pos += 2;
                    write_buffer_string(mem_pos, result1[46].length, result1[46])
                    mem_pos += result1[46].length
                }
                if (version >= 16) {
                    write_buffer_number(mem_pos, 2, result1[47].length);
                    mem_pos += 2;
                    write_buffer_string(mem_pos, result1[47].length, result1[47])
                    mem_pos += result1[47].length
                }
                if (version >= 17) {
                    write_buffer_number(mem_pos, 4, result1[48])
                    mem_pos += 4;
                }
                if (version >= 18) {
                    write_buffer_number(mem_pos, 4, result1[49])
                    mem_pos += 4;
                }
                if (version >= 19) {
                    write_buffer_number(mem_pos, 9, result1[50])
                    mem_pos += 9;
                }
                if (version >= 21) {
                    write_buffer_number(mem_pos, 2, result1[51])
                    mem_pos += 2;
                }
            }
        }
    } else {
        write_buffer_number(0, 2, result.version)
        write_buffer_number(2, 4, result.item_count)
        for (let a = 0; a < result.item_count; a++) {
            write_buffer_number(mem_pos, 4, result.items[a].item_id);
            mem_pos += 4;
            encoded_buffer_file[mem_pos++] = result.items[a].editable_type
            encoded_buffer_file[mem_pos++] = result.items[a].item_category
            encoded_buffer_file[mem_pos++] = result.items[a].action_type
            encoded_buffer_file[mem_pos++] = result.items[a].hit_sound_type
            write_buffer_number(mem_pos, 2, result.items[a].name.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].name.length, result.items[a].name, 1, result.items[a].item_id)
            mem_pos += result.items[a].name.length
            write_buffer_number(mem_pos, 2, result.items[a].texture.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].texture.length, result.items[a].texture)
            mem_pos += result.items[a].texture.length
            write_buffer_number(mem_pos, 4, result.items[a].texture_hash)
            mem_pos += 4;
            encoded_buffer_file[mem_pos++] = result.items[a].item_kind
            write_buffer_number(mem_pos, 4, result.items[a].val1)
            mem_pos += 4;
            encoded_buffer_file[mem_pos++] = result.items[a].texture_x
            encoded_buffer_file[mem_pos++] = result.items[a].texture_y
            encoded_buffer_file[mem_pos++] = result.items[a].spread_type
            encoded_buffer_file[mem_pos++] = result.items[a].is_stripey_wallpaper
            encoded_buffer_file[mem_pos++] = result.items[a].collision_type

            if (check_last_char(result.items[a].break_hits.toString(), "r")) encoded_buffer_file[mem_pos++] = Number(result.items[a].break_hits.toString().slice(0, -1))
            else encoded_buffer_file[mem_pos++] = Number(result.items[a].break_hits) * 6

            write_buffer_number(mem_pos, 4, result.items[a].drop_chance)
            mem_pos += 4;
            encoded_buffer_file[mem_pos++] = result.items[a].clothing_type
            write_buffer_number(mem_pos, 2, result.items[a].rarity)
            mem_pos += 2;

            encoded_buffer_file[mem_pos++] = result.items[a].max_amount
            write_buffer_number(mem_pos, 2, result.items[a].extra_file.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].extra_file.length, result.items[a].extra_file)
            mem_pos += result.items[a].extra_file.length
            write_buffer_number(mem_pos, 4, result.items[a].extra_file_hash)
            mem_pos += 4;
            write_buffer_number(mem_pos, 4, result.items[a].audio_volume)
            mem_pos += 4;
            write_buffer_number(mem_pos, 2, result.items[a].pet_name.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].pet_name.length, result.items[a].pet_name)
            mem_pos += result.items[a].pet_name.length
            write_buffer_number(mem_pos, 2, result.items[a].pet_prefix.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].pet_prefix.length, result.items[a].pet_prefix)
            mem_pos += result.items[a].pet_prefix.length
            write_buffer_number(mem_pos, 2, result.items[a].pet_suffix.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].pet_suffix.length, result.items[a].pet_suffix)
            mem_pos += result.items[a].pet_suffix.length
            write_buffer_number(mem_pos, 2, result.items[a].pet_ability.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].pet_ability.length, result.items[a].pet_ability)
            mem_pos += result.items[a].pet_ability.length
            encoded_buffer_file[mem_pos++] = result.items[a].seed_base
            encoded_buffer_file[mem_pos++] = result.items[a].seed_overlay
            encoded_buffer_file[mem_pos++] = result.items[a].tree_base
            encoded_buffer_file[mem_pos++] = result.items[a].tree_leaves
            encoded_buffer_file[mem_pos++] = result.items[a].seed_color.a
            encoded_buffer_file[mem_pos++] = result.items[a].seed_color.r
            encoded_buffer_file[mem_pos++] = result.items[a].seed_color.g
            encoded_buffer_file[mem_pos++] = result.items[a].seed_color.b
            encoded_buffer_file[mem_pos++] = result.items[a].seed_overlay_color.a
            encoded_buffer_file[mem_pos++] = result.items[a].seed_overlay_color.r
            encoded_buffer_file[mem_pos++] = result.items[a].seed_overlay_color.g
            encoded_buffer_file[mem_pos++] = result.items[a].seed_overlay_color.b
            write_buffer_number(mem_pos, 4, 0); // skipping ingredients
            mem_pos += 4;
            write_buffer_number(mem_pos, 4, result.items[a].grow_time);
            mem_pos += 4;
            write_buffer_number(mem_pos, 2, result.items[a].val2);
            mem_pos += 2;
            write_buffer_number(mem_pos, 2, result.items[a].is_rayman);
            mem_pos += 2;
            write_buffer_number(mem_pos, 2, result.items[a].extra_options.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].extra_options.length, result.items[a].extra_options)
            mem_pos += result.items[a].extra_options.length
            write_buffer_number(mem_pos, 2, result.items[a].texture2.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].texture2.length, result.items[a].texture2)
            mem_pos += result.items[a].texture2.length
            write_buffer_number(mem_pos, 2, result.items[a].extra_options2.length);
            mem_pos += 2;
            write_buffer_string(mem_pos, result.items[a].extra_options2.length, result.items[a].extra_options2)
            mem_pos += result.items[a].extra_options2.length
            hexStringToArrayBuffer(mem_pos, result.items[a].data_position_80)
            mem_pos += 80;
            if (result.version >= 11) {
                write_buffer_number(mem_pos, 2, result.items[a].punch_options.length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result.items[a].punch_options.length, result.items[a].punch_options)
                mem_pos += result.items[a].punch_options.length
            }
            if (result.version >= 12) {
                hexStringToArrayBuffer(mem_pos, result.items[a].data_version_12)
                mem_pos += 13;
            }
            if (result.version >= 13) {
                write_buffer_number(mem_pos, 4, result.items[a].int_version_13)
                mem_pos += 4;
            }
            if (result.version >= 14) {
                write_buffer_number(mem_pos, 4, result.items[a].int_version_14)
                mem_pos += 4;
            }
            if (result.version >= 15) {
                hexStringToArrayBuffer(mem_pos, result.items[a].data_version_15)
                mem_pos += 25;
                write_buffer_number(mem_pos, 2, result.items[a].str_version_15.length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result.items[a].str_version_15.length, result.items[a].str_version_15)
                mem_pos += result.items[a].str_version_15.length
            }
            if (result.version >= 16) {
                write_buffer_number(mem_pos, 2, result.items[a].str_version_16.length);
                mem_pos += 2;
                write_buffer_string(mem_pos, result.items[a].str_version_16.length, result.items[a].str_version_16)
                mem_pos += result.items[a].str_version_16.length
            }
            if (result.version >= 17) {
                write_buffer_number(mem_pos, 4, result.items[a].int_version_17)
                mem_pos += 4;
            }
            if (result.version >= 18) {
                write_buffer_number(mem_pos, 4, result.items[a].int_version_18)
                mem_pos += 4;
            }
            if (result.version >= 19) {
                write_buffer_number(mem_pos, 9, result.items[a].int_version_19)
                mem_pos += 9;
            }
            if (result.version >= 21) {
                write_buffer_number(mem_pos, 2, result.items[a].int_version_21)
                mem_pos += 2;
            }
        }
    }
}

/**
 * @param {Blob} file
 * @param {boolean} using_editor
 */

function item_encoder(file, using_editor) {
    // Reset buffer sebelum memulai encoding
    encoded_buffer_file = [];

    if (using_editor) {
        process_item_encoder(data_json, 0);
        saveDataBuffer(encoded_buffer_file, "items.dat");
        hash_buffer(encoded_buffer_file, "items_dat_hash_2", "Encoded Items dat Hash: ");
        encoded_buffer_file = []; // Clear buffer setelah selesai
        return;
    }

    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function (e) {
        try {
            if (document.getElementById("using_txt_mode").checked) {
                process_item_encoder(e.target.result, 1);
            } else {
                process_item_encoder(JSON.parse(e.target.result), 0);
            }
            saveDataBuffer(encoded_buffer_file, "items.dat");
            hash_buffer(encoded_buffer_file, "items_dat_hash_1", "Encoded Items dat Hash: ");
            encoded_buffer_file = []; // Clear buffer setelah selesai
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };
}

/**
 * @param {Blob} file
 * @param {boolean} using_editor
 */
function item_decoder(file) {
    return new Promise((resolve, reject) => {
        let data_json = {};
        let mem_pos = 6;
        var reader = new FileReader();

        reader.onload = function (e) {
            try {
                var arrayBuffer = new Uint8Array(e.target.result);
                var version = read_buffer_number(arrayBuffer, 0, 2);
                var item_count = read_buffer_number(arrayBuffer, 2, 4);

                if (version > 21) {
                    reject(new Error("Unsupported version: " + version));
                    return;
                }

                data_json.version = version;
                data_json.item_count = item_count;
                data_json.items = [];

                for (let a = 0; a < item_count; a++) {
                    var item_id = read_buffer_number(arrayBuffer, mem_pos, 4);
                    mem_pos += 4;

                    var editable_type = arrayBuffer[mem_pos++];
                    var item_category = arrayBuffer[mem_pos++];
                    var action_type = arrayBuffer[mem_pos++];
                    var hit_sound_type = arrayBuffer[mem_pos++];

                    var len = read_buffer_number(arrayBuffer, mem_pos, 2);
                    mem_pos += 2;
                    var name = read_buffer_string(arrayBuffer, mem_pos, len, true, Number(item_id));
                    mem_pos += len;

                    len = read_buffer_number(arrayBuffer, mem_pos, 2);
                    mem_pos += 2;
                    var texture = read_buffer_string(arrayBuffer, mem_pos, len);
                    mem_pos += len;

                    var texture_hash = read_buffer_number(arrayBuffer, mem_pos, 4);
                    mem_pos += 4;

                    var item_kind = arrayBuffer[mem_pos++];
                    var val1 = read_buffer_number(arrayBuffer, mem_pos, 4);
                    mem_pos += 4;

                    var texture_x = arrayBuffer[mem_pos++];
                    var texture_y = arrayBuffer[mem_pos++];
                    var spread_type = arrayBuffer[mem_pos++];
                    var is_stripey_wallpaper = arrayBuffer[mem_pos++];
                    var collision_type = arrayBuffer[mem_pos++];
                    var break_hits = arrayBuffer[mem_pos++];
                    break_hits = (break_hits % 6 !== 0) ? break_hits + "r" : break_hits / 6;

                    var drop_chance = read_buffer_number(arrayBuffer, mem_pos, 4);
                    mem_pos += 4;

                    var clothing_type = arrayBuffer[mem_pos++];
                    var rarity = read_buffer_number(arrayBuffer, mem_pos, 2);
                    mem_pos += 2;
                    var max_amount = arrayBuffer[mem_pos++];

                    len = read_buffer_number(arrayBuffer, mem_pos, 2);
                    mem_pos += 2;
                    var extra_file = read_buffer_string(arrayBuffer, mem_pos, len);
                    mem_pos += len;

                    var extra_file_hash = read_buffer_number(arrayBuffer, mem_pos, 4);
                    mem_pos += 4;
                    var audio_volume = read_buffer_number(arrayBuffer, mem_pos, 4);
                    mem_pos += 4;

                    len = read_buffer_number(arrayBuffer, mem_pos, 2);
                    mem_pos += 2;
                    var pet_name = read_buffer_string(arrayBuffer, mem_pos, len);
                    mem_pos += len;

                    len = read_buffer_number(arrayBuffer, mem_pos, 2);
                    mem_pos += 2;
                    var pet_prefix = read_buffer_string(arrayBuffer, mem_pos, len);
                    mem_pos += len;

                    len = read_buffer_number(arrayBuffer, mem_pos, 2);
                    mem_pos += 2;
                    var pet_suffix = read_buffer_string(arrayBuffer, mem_pos, len);
                    mem_pos += len;

                    len = read_buffer_number(arrayBuffer, mem_pos, 2);
                    mem_pos += 2;
                    var pet_ability = read_buffer_string(arrayBuffer, mem_pos, len);
                    mem_pos += len;

                    var seed_base = arrayBuffer[mem_pos++];
                    var seed_overlay = arrayBuffer[mem_pos++];
                    var tree_base = arrayBuffer[mem_pos++];
                    var tree_leaves = arrayBuffer[mem_pos++];

                    var seed_color = {
                        a: arrayBuffer[mem_pos++],
                        r: arrayBuffer[mem_pos++],
                        g: arrayBuffer[mem_pos++],
                        b: arrayBuffer[mem_pos++]
                    };

                    var seed_overlay_color = {
                        a: arrayBuffer[mem_pos++],
                        r: arrayBuffer[mem_pos++],
                        g: arrayBuffer[mem_pos++],
                        b: arrayBuffer[mem_pos++]
                    };

                    mem_pos += 4; // skip ingredients
                    var grow_time = read_buffer_number(arrayBuffer, mem_pos, 4);
                    mem_pos += 4;

                    var val2 = read_buffer_number(arrayBuffer, mem_pos, 2);
                    mem_pos += 2;
                    var is_rayman = read_buffer_number(arrayBuffer, mem_pos, 2);
                    mem_pos += 2;

                    len = read_buffer_number(arrayBuffer, mem_pos, 2);
                    mem_pos += 2;
                    var extra_options = read_buffer_string(arrayBuffer, mem_pos, len);
                    mem_pos += len;

                    len = read_buffer_number(arrayBuffer, mem_pos, 2);
                    mem_pos += 2;
                    var texture2 = read_buffer_string(arrayBuffer, mem_pos, len);
                    mem_pos += len;

                    len = read_buffer_number(arrayBuffer, mem_pos, 2);
                    mem_pos += 2;
                    var extra_options2 = read_buffer_string(arrayBuffer, mem_pos, len);
                    mem_pos += len;

                    var data_position_80 = hex(arrayBuffer.slice(mem_pos, mem_pos + 80), false).toUpperCase();
                    mem_pos += 80;

                    var punch_options = "", data_version_12 = "", int_version_13 = 0, int_version_14 = 0;
                    var data_version_15 = "", str_version_15 = "", str_version_16 = "";
                    var int_version_17 = 0, int_version_18 = 0, int_version_19 = 0, int_version_21 = 0;

                    if (version >= 11) {
                        len = read_buffer_number(arrayBuffer, mem_pos, 2);
                        mem_pos += 2;
                        punch_options = read_buffer_string(arrayBuffer, mem_pos, len);
                        mem_pos += len;
                    }

                    if (version >= 12) {
                        data_version_12 = hex(arrayBuffer.slice(mem_pos, mem_pos + 13), false).toUpperCase();
                        mem_pos += 13;
                    }

                    if (version >= 13) {
                        int_version_13 = read_buffer_number(arrayBuffer, mem_pos, 4);
                        mem_pos += 4;
                    }

                    if (version >= 14) {
                        int_version_14 = read_buffer_number(arrayBuffer, mem_pos, 4);
                        mem_pos += 4;
                    }

                    if (version >= 15) {
                        data_version_15 = hex(arrayBuffer.slice(mem_pos, mem_pos + 25), false).toUpperCase();
                        mem_pos += 25;

                        len = read_buffer_number(arrayBuffer, mem_pos, 2);
                        mem_pos += 2;
                        str_version_15 = read_buffer_string(arrayBuffer, mem_pos, len);
                        mem_pos += len;
                    }

                    if (version >= 16) {
                        len = read_buffer_number(arrayBuffer, mem_pos, 2);
                        mem_pos += 2;
                        str_version_16 = read_buffer_string(arrayBuffer, mem_pos, len);
                        mem_pos += len;
                    }

                    if (version >= 17) {
                        int_version_17 = read_buffer_number(arrayBuffer, mem_pos, 4);
                        mem_pos += 4;
                    }

                    if (version >= 18) {
                        int_version_18 = read_buffer_number(arrayBuffer, mem_pos, 4);
                        mem_pos += 4;
                    }

                    if (version >= 19) {
                        int_version_19 = read_buffer_number(arrayBuffer, mem_pos, 9);
                        mem_pos += 9;
                    }

                    if (version >= 21) {
                        int_version_21 = read_buffer_number(arrayBuffer, mem_pos, 2);
                        mem_pos += 2;
                    }

                    data_json.items[a] = {
                        item_id, editable_type, item_category, action_type, hit_sound_type,
                        name, texture, texture_hash, item_kind, val1, texture_x, texture_y,
                        spread_type, is_stripey_wallpaper, collision_type, break_hits, drop_chance,
                        clothing_type, rarity, max_amount, extra_file, extra_file_hash, audio_volume,
                        pet_name, pet_prefix, pet_suffix, pet_ability, seed_base, seed_overlay,
                        tree_base, tree_leaves, seed_color, seed_overlay_color, grow_time,
                        val2, is_rayman, extra_options, texture2, extra_options2,
                        data_position_80, punch_options, data_version_12, int_version_13,
                        int_version_14, data_version_15, str_version_15, str_version_16,
                        int_version_17, int_version_18, int_version_19, int_version_21
                    };
                }

                // panggil saveData yang sudah dioverride sebelumnya untuk resolve
                window.saveData(JSON.stringify(data_json, null, 4), "items.json");

                resolve();
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = function (e) {
            reject(new Error("File reading failed"));
        };

        console.log('Starting to read file with FileReader...');
        reader.readAsArrayBuffer(file);
    });
}