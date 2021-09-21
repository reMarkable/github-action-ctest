import * as fs from 'fs'
import * as process from 'process'
import Path from 'path'
import {context} from '@actions/github'

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
    const testlog = fs.readFileSync(filepath, {encoding: 'utf8'})

    const all_passed = /100% tests passed/
    if (testlog.match(all_passed)) {
      resolve('')
      return
    }

    const summary_regexp = /The following tests FAILED:.*(?:[^]\s+.*)*/m
    const summary =
      testlog.match(summary_regexp)?.[0] ||
      'Error parsing testlog, summary not found.'

    const fail_regexp =
      /^.*FAIL!.*(:?\n(:?.*\s{2,})(:?Actual|Expected|Loc).*)+/gm
    const failures = testlog.match(fail_regexp)?.join('\n')

    const report = `${summary}\n\n${failures}`
    // PR comments can be up to 65536 chars long
    const max_length = 65536 - 500
    if (report.length > max_length) {
      resolve(`${report.substring(0, max_length)}...`)
      return
    }
    resolve(report.substring(0, max_length))
  })
}
