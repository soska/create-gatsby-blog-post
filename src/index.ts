import * as path from 'path';

import * as fs from 'mz/fs';
import * as mkdir from 'mz-modules/mkdirp';
import * as formatDate from 'date-fns/format';
import * as capitalize from 'lodash.capitalize';
import * as dasherize from 'lodash.kebabcase';

import definedDefaults from './defaults';
import post from './templates/post';

const normalize = options => {
  options.folder = options.dasherize
    ? dasherize(options.folder)
    : options.folder;
  options.root = path.resolve(options.root);
  options.dry = options.dryRun || options.dry;
  return options;
};

export const createPost = (folder, opts = {}) => {
  if (!folder) {
    throw new Error('A post title is required');
  }

  const options = normalize(
    Object.assign({}, definedDefaults, opts, {
      folder
    })
  );
  const capitalized = folder.split(/(-|\s)/).map(capitalize).join(' ');

  const date = new Date(options.date);

  const folderName = [
    formatDate(date, options.dateFormat),
    options.folder
  ].join('-');

  const template = post(
    {
      capitalized,
      folder: options.folder,
      date
    },
    options
  );

  const outputFolder = path.join(options.root, folderName);

  if (options.dry) {
    if (options.log) {
      console.log(
        `Would have created ${outputFolder}, but 'dry' option was specified`
      );
    }
    return Promise.resolve({ dry: true, path: outputFolder, success: true });
  }

  return mkdir(outputFolder)
    .then(() => {
      return fs.writeFile(
        path.join(outputFolder, 'index.md'),
        template,
        'utf8'
      );
    })
    .then(() => ({ path: outputFolder, success: true }))
    .catch(err => {
      throw err;
    });
};
