const gulp = require("gulp");
const { spawn } = require("child_process");
const path = require("path");
const copy = require("recursive-copy");
const fs = require("fs");
const rimraf = require("rimraf");

const SCOPE = "@myscope";
const DIST_DIR = "dist";

function getParam(label, required) {
    let option,
        ii = process.argv.indexOf(label);
    if (ii < 0 || process.argv.length < ii + 2) {
        if (required) {
            throw new Error(`Required param [${label}] not specified.`);
        } else {
            return null;
        }
    }
    return process.argv[ii + 1];
}

function getLibInfo() {
    const name = getParam("--lib", true);

    const distDir = path.join(
        getParam("--libroot") || path.join("..", "test-lib"),
        "dist",
        name
    );

    try {
        fs.accessSync(distDir, fs.constants.R_OK);
    } catch (err) {
        process.stderr.write(err.toString());
        throw new Error(`Library [${name}] does not appear to exist.`);
    }
    return {
        name,
        distDir,
        nodeDir: path.join("node_modules", SCOPE, name)
    };
}

gulp.task("updatelib", () => {
    let lib = getLibInfo();
    // console.log(lib);
    rimraf(lib.nodeDir, () => {
        copy(
            path.join(lib.distDir),
            path.join(lib.nodeDir),
            (error, results) => {
                if (error) {
                    throw error;
                }
                process.stdout.write("Updated lib.\n");
            }
        );
    });
});
