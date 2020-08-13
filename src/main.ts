import * as core from '@actions/core'
import {context, getOctokit} from '@actions/github'
import {ctest_log} from './ctest_log'

async function run(): Promise<void> {
  try {
    const token = core.getInput('github-token', {required: true})
    const github = getOctokit(token)

    if (context.eventName !== 'pull_request') {
      return
    }
    if (!context.payload.pull_request) {
      return
    }

    const filename: string = core.getInput('logfile')
    const logdata = await ctest_log(filename)

    github.issues.createComment({
      issue_number: context.payload.pull_request.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: `The ctest log on '\${{ runner.os }}' is:\n\`\`\`${logdata}\`\`\``
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
