// Parse URL parameters from the script's own src
(function() {
    try {
        // Find the current script element
        const currentScript = document.currentScript;

        debugger;

        if (!currentScript || !currentScript.src) {
            console.warn("Script source not found.");
            return;
        } else { }

        // Extract query parameters
        const params = new URLSearchParams((new URL(currentScript.src)).search);

        // read parameters
        const var1 = params.get("var1") || "default1";  // null or empty
        const var2 = params.get("var2") ?? "default2";  // null only

        console.log("var1:", var1);
        console.log("var2:", var2);

        alert (`var1 = ${var1}\nvar2 = ${var2}`);
    } catch ( err ) {
        console.error("Error reading script parameters:", err);
    }
})();
