/*const firebase = require("nativescript-plugin-firebase");

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
  () => {
    console.log("firebase.init done");
  },
  error => {
    console.log(`firebase.init error: ${error}`);
  }
);*/

import { svelteNative } from "svelte-native";
import App from  "./App.svelte";
svelteNative(App, {});

