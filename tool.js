let superSecureString = "CHANGE ME TO YOUR OWN RANDOM STRING"; var XORCipher = { encode: function (t, e) { return e = this.xor_encrypt(t, e) }, decode: function (t, e) { return e = this.b64_decode(e), this.xor_decrypt(t, e) }, b64_table: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", b64_encode: function (t) { var e = 0, r = ""; if (!t) return t; do { var h = t[e++], n = t[e++], i = t[e++], a = h << 16 | n << 8 | i; h = a >> 18 & 63, n = a >> 12 & 63, i = a >> 6 & 63, a &= 63, r += this.b64_table.charAt(h) + this.b64_table.charAt(n) + this.b64_table.charAt(i) + this.b64_table.charAt(a) } while (e < t.length); return ((t = t.length % 3) ? r.slice(0, t - 3) : r) + "===".slice(t || 3) }, b64_decode: function (t) { var e = 0, r = []; if (!t) return t; t += ""; do { var h = this.b64_table.indexOf(t.charAt(e++)), n = this.b64_table.indexOf(t.charAt(e++)), i = this.b64_table.indexOf(t.charAt(e++)), a = this.b64_table.indexOf(t.charAt(e++)), c = h << 18 | n << 12 | i << 6 | a; h = c >> 16 & 255, n = c >> 8 & 255, c &= 255, r.push(h), 64 !== i && (r.push(n), 64 !== a && r.push(c)) } while (e < t.length); return r }, keyCharAt: function (t, e) { return t.charCodeAt(Math.floor(e % t.length)) }, xor_encrypt: function (t, e) { for (var r = [], h = 0; h < e.length; h++)r.push(e[h].charCodeAt(0) ^ this.keyCharAt(t, h)); return r }, xor_decrypt: function (t, e) { for (var r = [], h = 0; h < e.length; h++)r.push(String.fromCharCode(e[h] ^ this.keyCharAt(t, h))); return r.join("") } }; function crypt(input) {
  var output = []; var charCode; for (var i = 0; i < input.length; i++) { charCode = input.charCodeAt(i) ^ superSecureString[i % superSecureString.length].charCodeAt(0); output.push(String.fromCharCode(charCode)); }
  return output.join("");
}
function download(filename, text) {
  var pom = document.createElement('a'); pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)); pom.setAttribute('download', filename); if (document.createEvent) { var event = document.createEvent('MouseEvents'); event.initEvent('click', true, true); pom.dispatchEvent(event); }
  else { pom.click(); }
}
let keyBindings = new Map(); keyBindings.set("myTotalExp", "Total Experience"); keyBindings.set("PlayersMoney", "Player's Money"); keyBindings.set("EMFReaderInventory", "Total EMF Readers"); keyBindings.set("FlashlightInventory", "Total Flashlights"); keyBindings.set("CameraInventory", "Total Photo Cameras"); keyBindings.set("LighterInventory", "Total Lighters"); keyBindings.set("CandleInventory", "Total Candles"); keyBindings.set("UVFlashlightInventory", "Total UV Flashlights"); keyBindings.set("CrucifixInventory", "Total Crucifixes"); keyBindings.set("DSLRCameraInventory", "Total DSLR Cameras"); keyBindings.set("EVPRecorderInventory", "Total Spirit Boxes"); keyBindings.set("SaltInventory", "Total Salt"); keyBindings.set("SageInventory", "Total Smudge Sticks"); keyBindings.set("TripodInventory", "Total Tripods"); keyBindings.set("StrongFlashlightInventory", "Total Strong Flashlights"); keyBindings.set("MotionSensorInventory", "Total Motion Sensors"); keyBindings.set("SoundSensorInventory", "Total Sound Sensors"); keyBindings.set("SanityPillsInventory", "Total Sanity Pills"); keyBindings.set("ThermometerInventory", "Total Thermometers"); keyBindings.set("GhostWritingBookInventory", "Total Ghost Writing Books"); keyBindings.set("IRLightSensorInventory", "Total IR Light Sensors"); keyBindings.set("ParabolicMicrophoneInventory", "Total Parabolic Microphones"); keyBindings.set("GlowstickInventory", "Total Glowsticks"); keyBindings.set("HeadMountedCameraInventory", "Total Head Mounted Cameras"); $(document).ready(function () {
  $("input[type=file]").on("change", function () {
    let fileContents = $("#submitSaveData input[type=file]").prop("files")[0]; $("#modifySaveData").html(""); let fileReader = new FileReader(); fileReader.onload = function () {
      console.debug("Received file from client's computer. Response below: "); console.log(fileReader.result); console.debug("Splitting information to only the part we care about."); let gameSaveDataResult = fileReader.result.split("base64,")[1]; console.debug("Decoding it via XOR with the Secret Key"); let result = XORCipher.decode(superSecureString, gameSaveDataResult); console.debug("Attempted to decode. Result: "); console.log(result); try { JSON.parse(result); $(".savedata-error").hide("fade"); } catch (exception) { console.debug("Unable to parse JSON information from string received. Invalid SaveData."); $(".savedata-error").show("fade"); return; }
      result = JSON.parse(result)["IntData"]; console.debug("Attempted to check IntData for Player Properties."); result.forEach(function (key, value) {
        let keyName = key.Key; let keyValue = key.Value; let friendlyName = keyName; if (keyBindings.get(keyName) != null) { friendlyName = keyBindings.get(keyName); }
        let stringBuilder = "<div class=\"form-group\">"; stringBuilder = stringBuilder + `<input type='text' name='${keyName}' value='${keyValue}' class='form-control' />`; stringBuilder = stringBuilder + `<label for='${keyName}'>${friendlyName}</label>`; stringBuilder = stringBuilder + "</div>"; $("#modifySaveData").append(`<div class='col-md-4' style='display: inline-block'>${stringBuilder}</div>`);
      }); $(".page-one").hide(); $(".page-two").show(); $("#modifySaveData").append("<div class='col-md-12' style='display: block'>Once you've finished with your changes, hit '<b>Save to System</b>' and copy the file that's downloaded back into your <b><code>%userprofile%\\appdata\\locallow\\Kinetic Games\\Phasmophobia</code></b> directory, ensuring the file name is the same.<br><hr></div>"); $("#modifySaveData").append(`<div class='col-md-4' style='display: inline-block'><input type='submit' value='Save to System' class='btn btn-primary' /></div>`); if (result.count < 2) { $("#modifySaveData").append("<div class='col-md-12' style='display: inline-block'><div class='alert alert-danger'>Are no values appearing? There might be an issue with your saveData. Please make sure that your game language is set to English and that you have played the tutorial at least once before re-trying.</div></div>"); }
    }
    fileReader.readAsDataURL(fileContents);
  }); $("#modifySaveData").on("submit", function () { let formResult = $(this).serializeArray(); let saveToFileArray = {}; saveToFileArray["StringData"] = [{ "Key": "GhostType", "Value": "Cain" }]; saveToFileArray["IntData"] = []; saveToFileArray["FloatData"] = []; saveToFileArray["BoolData"] = []; formResult.forEach(function (key) { let formName = key.name; let formValue = key.value; saveToFileArray["IntData"].push({ "Key": formName, "Value": formValue }); }); let encryptedFile = crypt(JSON.stringify(saveToFileArray)); download("saveData.txt", encryptedFile); }); $("#backBtn").on("click", function () { $(".page-one").show(); $(".page-two").hide(); });
});
