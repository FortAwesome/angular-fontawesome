'use strict';
// original code by the Angular Material 2 team

const fs = require('fs');
const glob  = require('glob');
const path = require('path');
const sass = require('node-sass');

const inlineResources = (globs, sourcePrefix) => {
    if (typeof globs === 'string') {
        globs = [globs];
    }

    return Promise.all(
        globs.map((pattern) => replaceSource(pattern, sourcePrefix))
    );
};

const replaceSource = (pattern, sourcePrefix) => {
    // pattern is a directory
    if (pattern.indexOf('*') === -1) {
        pattern = path.join(pattern, '**', '*');
    }

    return new Promise((resolve, reject) => {
        glob(pattern, {}, (error, files) => {
            if (error) reject(Error);

            files.filter((name) => /\.ts$/.test(name)).forEach((filePath) => {
                try {
                    inlineFileResources(filePath, sourcePrefix);
                } catch (readError) {
                    reject(readError);
                }
            });

            resolve();
        });
    });
};

const inlineFileResources = (filePath, sourcePrefix) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const inlineContents = inlineResourcesFromString(content, sourcePrefix, (url) =>
        path.join(path.dirname(filePath), url)
    );

    fs.writeFileSync(filePath, inlineContents);
};

const inlineResourcesFromString = (content, sourcePrefix, callback) => [
    inlineTemplate, inlineStyle, removeModuleId
].reduce((final, method) => method(final, sourcePrefix, callback), content);

const inlineTemplate = (content, sourcePrefix, callback) =>
    content.replace(/templateUrl:\s*'([^']+?\.html)'/g, (match, url) => {
        const mini = getMiniContents(url, sourcePrefix, callback);

        return `template: "${mini}"`;
    });

const inlineStyle = (content, sourcePrefix, callback) =>
    content.replace(/styleUrls:\s*(\[[\s\S]*?\])/gm, (match, styleUrls) => {
        const urls = eval(styleUrls);   // string -> array
        return 'styles: [' + urls.map((url) => {
            const mini = getMiniContents(url, sourcePrefix, callback);

            return `"${mini}"`;
        }).join(',\n') + ']';
    });

const getMiniContents = (url, sourcePrefix, callback) => {
    const srcFile = callback(url);
    const file = srcFile.replace(/^dist/, sourcePrefix)
    const srcDir = file.slice(0, file.lastIndexOf(path.sep));
    let template = '';

    if (file.match(/\.s(a|c)ss$/)) {
        // convert SASS -> CSS
        template = sass.renderSync({
            file,
            importer: (url) => handleSassImport(url, srcDir)
        });
        template = template.css.toString();
    } else {
        template = fs.readFileSync(file, 'utf8');
    }

    return minifyText(template);
};

const handleSassImport = (url, srcDir) => {
    const fullUrl = getFullSassUrl(url, srcDir);
    let isPartial = false;
    let validUrls = getSassUrls(fullUrl);

    // if we can't find the file, try to
    // see find it as a partial (underscore-prefixed)
    if (validUrls.length === 0) {
        validUrls = getSassUrls(fullUrl, true);
        isPartial = true;
    }

    const file = getSassImportUrl(validUrls);

    // CSS files don't get compiled in
    return /\.css$/.test(file) ?
        { contents: fs.readFileSync(file, 'utf8') } :
        { file };
};

const getSassUrls = (url, partial) => {
    let extensions = ['sass', 'scss'];

    if (!partial) {
        extensions = extensions.concat('', 'css');
    } else {
        const lastSlash = url.lastIndexOf(path.sep);
        const urlDir = url.slice(0, lastSlash);
        const fileName = url.slice(lastSlash + 1);

        if (fileName[0] !== '_') {
            url = urlDir + path.sep + '_' + fileName;
        }
    }

    return extensions.reduce((valid, extension) => {
        const extensionUrl = verifyUrl(url, extension);

        if (extensionUrl) {
            valid = valid.concat(extensionUrl);
        }

        return valid;
    }, []);
};

const verifyUrl = (url, extension) => {
    if (extension) {
        url = url + `.${ extension }`;
    }

    if (!fs.existsSync(url)) {
        url = null;
    }

    return url;
}

// convert ~-prefixed filenames to node_modules-prefixed
// make all others relative to srcDir
const getFullSassUrl = (url, srcDir) =>
    /^~/.test(url) ?
        path.resolve('node_modules', url.slice(1)) :
        path.resolve(srcDir, url);

const getSassImportUrl = (validUrls) => {
    if (validUrls.length !== 1) {
        let error = 'Cannot determine Sass/CSS file to process. ';

        if (validUrls.length === 0) {
            error = error + `\n There are no files matching ${ url }`;
        } else {
            error = error + 'Candidates:\n ' + validUrls.join('\n ')
                + '\nPlease delete or rename all but one of these files or specify the extension to use.';
        }

        throw new Error(error);
    }

    return validUrls[0];
};


const minifyText = (text) => text
    .replace(/([\n\r]\s*)+/gm, ' ')
    .replace(/"/g, '\\"');

const removeModuleId = (content) =>
    content.replace(/\s*moduleId:\s*module\.id\s*,?\s*/gm, '');

module.exports = inlineResources;

if (!module.parent) {
    inlineResources('./build', 'src');
}
