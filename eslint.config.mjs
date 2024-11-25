import globals from "globals";
import pluginJs from "@eslint/js";

export default [
    {
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
        rules: {
            "no-unused-vars": "off", // Disable the no-unused-vars rule
        },
    },
    pluginJs.configs.recommended,
];
