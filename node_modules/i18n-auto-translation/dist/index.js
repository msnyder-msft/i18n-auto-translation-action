#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("./translate/cli");
const translate_supplier_1 = require("./translate/translate-supplier");
try {
    translate_supplier_1.TranslateSupplier.getProvider(cli_1.argv.apiProvider).translate();
}
catch (e) {
    if (e instanceof Error)
        console.log(e.message);
    else
        console.log(e);
}
//# sourceMappingURL=index.js.map