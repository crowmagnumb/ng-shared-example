const gulp = require("gulp");
const cp = require("child_process");
const path = require("path");

const DIST_DIR = "dist";

function getLibName() {
    let option,
        ii = process.argv.indexOf("--lib");
    return ii > -1 ? process.argv[ii + 1] : null;
}

gulp.task("build", () => {
    let libName = getLibName();
    if (!libName) {
        throw new Error("lib not specified. e.g. gulp build <libName>");
    }
    cp.execSync(`ng build ${libName}`, {
        stdio: "inherit"
    });
    cp.execSync(
        `cp -r ${path.join("projects", libName, "src")} ${path.join(
            DIST_DIR,
            libName
        )}`
    );
});
