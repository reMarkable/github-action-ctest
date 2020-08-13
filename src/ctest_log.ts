import * as fs from 'fs';
import Path from 'path';

export async function ctest_log(logfile: string): Promise<string> {
  return new Promise(resolve => {
    if (logfile === '') {
      throw new Error('No file passed')
    }

    const filepath = Path.join(__dirname, '..', logfile)
    if (!fs.existsSync(filepath)) {
      throw new Error(`File "${logfile}" was not found`)
    }

    const testlog = fs.readFileSync(filepath, {encoding: 'utf8'})
    resolve(testlog)
  })
}
