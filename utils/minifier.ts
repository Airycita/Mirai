// @ts-nocheck
import { minify } from "uglify-js";
import { filter } from "lodash";
import { cwd } from "process";
import fs from "fs";

async function mini(i: string): Promise<fs.Dirent[]> {
    var e = fs.readdirSync(i, { withFileTypes: !0 }).map((e: fs.Dirent) => (e.name = `${i}/${e.name}`, e)),
        r = filter(e, (e => e.isFile() && e.name.endsWith(".js"))),
        n = filter(e, (e => e.isDirectory()));
    for (var a of n) r.push(...(await mini(a.name)));
    for (var a of r) {
        var x = fs.readFileSync(a.name, { encoding: "utf-8" }),
            ifyed = minify(x)?.code as string;
        if (!ifyed || ifyed == x) continue;
        fs.writeFileSync(a.name, ifyed, "utf-8");
    };
    return r;
};

mini(cwd() + "/dist/").then(() => console.log("Source encoded."));