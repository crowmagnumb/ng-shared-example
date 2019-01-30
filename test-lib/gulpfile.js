const gulp = require("gulp");
const { spawn } = require("child_process");
const path = require("path");
const copy = require("recursive-copy");
const fs = require("fs");
const rimraf = require("rimraf");

const TMP_DIR = "tmp";
const PROJECTS_DIR = "projects";
const DIST_DIR = "dist";

function getLibInfo() {
    let option,
        ii = process.argv.indexOf("--lib");
    if (ii < 0 || process.argv.length < ii + 2) {
        throw new Error("lib not specified. e.g. gulp build <libName>");
    }
    const name = process.argv[ii + 1];
    const libDir = path.join(PROJECTS_DIR, name);
    try {
        fs.accessSync(libDir, fs.constants.R_OK);
    } catch (err) {
        process.stderr.write(err.toString());
        throw new Error(`Library [${name}] does not appear to exist.`);
    }
    const nameNS = "nativescript-" + name;
    return {
        name,
        nameNS,
        libDir,
        srcDir: path.join(libDir, "src"),
        distDir: path.join(DIST_DIR, name),
        distDirNS: path.join(DIST_DIR, nameNS)
    };
}

function buildLibrary(name, srcDir, distDir) {
    const cmd = spawn("ng", ["build", name]);
    cmd.stdout.on("data", data => process.stdout.write(data.toString()));
    cmd.stderr.on("data", data => process.stderr.write(data.toString()));
    cmd.on("exit", code => {
        if (code != 0) {
            console.log(`Failed with code ${code}`);
        }
        copy(
            path.join(srcDir, "assets"),
            path.join(distDir, "assets"),
            (error, results) => {
                if (error) {
                    throw error;
                } else {
                    process.stdout.write("Copied assets.\n");
                }
            }
        );
    });
    return cmd;
}

function walkSync(dir, fnc) {
    fs.readdirSync(dir).forEach(filename => {
        const fullpath = path.join(dir, filename);
        if (fs.statSync(fullpath).isDirectory()) {
            filelist = walkSync(fullpath, fnc);
        } else {
            fnc(fullpath);
        }
    });
}

gulp.task("build:ns", () => {
    const lib = getLibInfo();
    const tmpDir = path.join(TMP_DIR, lib.nameNS);

    rimraf(tmpDir, () => {
        copy(lib.libDir, tmpDir, (error, results) => {
            if (error) {
                throw error;
            }
            walkSync(tmpDir, file => {
                if (file.endsWith(".tns.json")) {
                    fs.renameSync(file, file.slice(0, -8) + "json");
                } else if (file.endsWith(".tns.ts")) {
                    fs.renameSync(file, file.slice(0, -6) + "ts");
                } else if (file.endsWith(".tns.html")) {
                    fs.renameSync(file, file.slice(0, -8) + "html");
                }
            });
            buildLibrary(lib.nameNS, lib.srcDir, lib.distDirNS);
        });
    });
});

gulp.task("build", () => {
    const lib = getLibInfo();
    //
    // Web version
    //
    return buildLibrary(lib.name, lib.srcDir, lib.distDir);
});
