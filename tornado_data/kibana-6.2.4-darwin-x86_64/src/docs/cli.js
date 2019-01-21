'use strict';

var _child_process = require('child_process');

var _commander = require('commander');

var _docs_repo = require('./docs_repo');

const cmd = new _commander.Command('node scripts/docs');
cmd.option('--docrepo [path]', 'local path to the docs repo', (0, _docs_repo.defaultDocsRepoPath)()).option('--open', 'open the docs in the browser', false).parse(process.argv);

try {
  (0, _child_process.execFileSync)((0, _docs_repo.buildDocsScript)(cmd), (0, _docs_repo.buildDocsArgs)(cmd));
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error(`elastic/docs repo must be cloned to ${cmd.docrepo}`);
  } else {
    console.error(err.stack);
  }

  process.exit(1);
}
