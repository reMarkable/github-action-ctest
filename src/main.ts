import * as core from '@actions/core'
import {context, getOctokit} from '@actions/github'
import {ctest_log} from './ctest_log'

async function run(): Promise<void> {
  try {
    if (context.eventName !== 'pull_request') {
      return
    }
    if (!context.payload.pull_request) {
      return
    }

    const token = core.getInput('github-token', {required: true})
    const github = getOctokit(token)

    const platform: string = core.getInput('platform')
    const filename: string = core.getInput('logfile')
    const logdata = await ctest_log(filename)

    context.payload.repository?.name

    if (logdata) {
      github.issues.createComment({
        issue_number: context.payload.pull_request.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: `Sadly there were some test failures on '${platform}':\n\`\`\`\n${logdata}\n\`\`\``
      })
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
