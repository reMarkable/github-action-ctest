import * as fs from 'fs'
import Path from 'path'
import {context} from '@actions/github'

import * as process from 'process'

export async function ctest_log(logfile: string): Promise<string> {
  return new Promise(resolve => {
    if (logfile === '') {
      throw new Error('No file passed')
    }

    const basePath = process.env.RUNNER_WORKSPACE || './'
    const repoName = context.payload.repository?.name || ''
    const filepath = Path.join(basePath, repoName, logfile)
    if (!fs.existsSync(filepath)) {
      throw new Error(
        `File "${logfile}" was not found, looked in "${filepath}"`
      )
    }

    // const fail_regexp = /^.*(FAIL!).*[^].*[^].*[^].*/

    const testlog = fs.readFileSync(filepath, {encoding: 'utf8'})

    resolve(testlog)
  })
}
