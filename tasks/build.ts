import { copySync } from 'fs-extra';
import { build } from 'ng-packagr';
import { join } from 'path';


async function main() {
  await build({
    project: join(process.cwd(), '/src/lib/package.json')
  });
  copySync('README.md', join(process.cwd(), 'dist/README.md'));
}

main()
  .then(() => console.log('success'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
