const gulp = require("gulp");
const { spawn } = require("child_process");
const path = require("path");
const copy = require("recursive-copy");
const fs = require("fs");
const rimraf = require("rimraf");

const DIST_DIR = "dist";

function getLibInfo() {
    let option,
        ii = process.argv.indexOf("--lib");
    if (ii < 0 || process.argv.length < ii + 2) {
        throw new Error("lib not specified. e.g. gulp build <libName>");
    }
    const name = process.argv[ii + 1];
    const libDir = path.join("projects", name);
    try {
        fs.accessSync(libDir, fs.constants.R_OK);
    } catch (err) {
        process.stderr.write(err.toString());
        throw new Error(`Library [${name}] does not appear to exist.`);
    }
    return {
        name,
        libDir,
        srcDir: path.join(libDir, "src"),
        distDir: path.join(DIST_DIR, name),
        distDirNS: path.join(DIST_DIR, "nativescript-" + name)
    };
}

//
// TODO: I think this would work if this was just a normal nativescript plugin but since
// this is an angular nativescript plugin we have to do something else. I just don't
// know what that is right now.
//
gulp.task("build:ns", () => {
    let lib = getLibInfo();
    rimraf(lib.distDirNS, () => {
        copy(
            path.join(lib.srcDir),
            path.join(lib.distDirNS),
            (error, results) => {
                if (error) {
                    throw error;
                }
                process.stdout.write("Copied src.\n");
                copy(
                    path.join(lib.libDir, "package.tns.json"),
                    path.join(lib.distDirNS, "package.json"),
                    err => {
                        if (err) {
                            throw err;
                        }
                        process.stdout.write("Copied package.json.\n");
                    }
                );
            }
        );
    });
});

gulp.task("build", () => {
    let lib = getLibInfo();
    //
    // Web version
    //
    const cmd = spawn("ng", ["build", lib.name]);
    cmd.stdout.on("data", data => process.stdout.write(data.toString()));
    cmd.stderr.on("data", data => process.stdout.write(data.toString()));
    cmd.on("exit", code => {
        if (code != 0) {
            console.log(`Failed with code ${code}`);
        }
        copy(
            path.join(lib.srcDir, "assets"),
            path.join(lib.distDir, "assets"),
            (error, results) => {
                if (error) {
                    process.stderr.write(error);
                } else {
                    process.stdout.write("Copied assets.\n");
                }
            }
        );
    });

    return cmd;
});
