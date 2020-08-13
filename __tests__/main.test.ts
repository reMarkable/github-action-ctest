import {ctest_log} from '../src/ctest_log'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

test('throws no file', async () => {
  await expect(ctest_log('')).rejects.toThrow('No file passed')
})

test('throws invalid file', async () => {
  await expect(ctest_log('foo.bar')).rejects.toThrow(
    /File "foo.bar" was not found.*/
  )
})

test('test runs', async () => {
  const logdata = await ctest_log('__tests__/data/ctest_tst_line.log')
  expect(logdata.startsWith('[HAND'))
})
