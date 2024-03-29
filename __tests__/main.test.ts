import {ctest_log} from '../src/ctest-log'
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

test('passed all tests', async () => {
  const logdata = await ctest_log('__tests__/data/ctest_tst_line.log')
  expect(logdata).toBe('')
})

test('failed one test', async () => {
  const logdata = await ctest_log('__tests__/data/ctest_fail.log')
  // const failures = `69: FAIL!  : PlatformHelpersTest::requireThat_parallellExportSucceeds() Compared values are not the same`

  const summary = `The following tests FAILED:
\t 69 - tst_platformhelperstest (Timeout)
`
  const failures = `
69: FAIL!  : PlatformHelpersTest::requireThat_parallellExportSucceeds() Compared values are not the same
69:    Actual   ((messages.size())) : 0
69:    Expected (outputPaths.size()): 5
69:    Loc: [../unittests/platformhelperstest.cpp(154)]`

  expect(logdata).toBe(`${summary}${failures}`)
})

test('failed two tests', async () => {
  const logdata = await ctest_log('__tests__/data/two_tests_failed.log')
  const summary = `The following tests FAILED:
\t  1 - tst_brushgfx (Failed)
\t 60 - tst_librarycontroller (Child aborted)
`
  expect(logdata).toBe(`${summary}${many_failures}`)
})

const many_failures = `
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: Gray, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: Gray, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: Gray, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: Gray, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: Gray, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: White, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: White, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: White, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: White, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: White, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrush: White, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: Gray, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: Gray, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: Gray, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: Gray, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: Gray, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: White, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: White, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: White, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: White, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: White, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencil: White, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: Gray, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: Gray, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: Gray, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: Gray, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: Gray, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: White, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: White, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: White, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: White, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: White, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpoint: White, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: Gray, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: Gray, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: Gray, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: Gray, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: Gray, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: White, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: White, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: White, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: White, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: White, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Marker: White, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: Gray, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: Gray, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: Gray, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: Gray, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: Gray, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: White, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: White, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: White, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: White, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: White, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Fineliner: White, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: Gray, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: Gray, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: Gray, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: Gray, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: Gray, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: White, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: White, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: White, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: White, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: White, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Highlighter: White, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: Gray, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: Gray, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: Gray, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: Gray, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: Gray, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: White, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: White, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: White, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: White, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: White, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Eraser: White, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: Gray, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: Gray, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: Gray, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: Gray, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: Gray, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: White, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: White, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: White, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: White, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: White, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencil: White, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: Gray, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: Gray, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: Gray, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: Gray, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: Gray, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: White, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: White, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: White, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: White, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: White, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(EraseSection: White, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: Gray, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: Gray, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: Gray, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: Gray, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: Gray, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: White, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: White, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: White, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: White, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: White, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(ZoomTool: White, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: Gray, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: Gray, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: Gray, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: Gray, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: Gray, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: White, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: White, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: White, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: White, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: White, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SelectionTool: White, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: Gray, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: Gray, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: Gray, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: Gray, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: Gray, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: White, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: White, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: White, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: White, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: White, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Paintbrushv2: White, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: Gray, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: Gray, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: Gray, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: Gray, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: Gray, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: White, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: White, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: White, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: White, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: White, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(SharpPencilv2: White, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: Gray, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: Gray, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: Gray, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: Gray, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: Gray, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: White, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: White, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: White, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: White, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: White, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Pencilv2: White, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: Gray, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: Gray, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: Gray, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: Gray, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: Gray, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: White, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: White, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: White, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: White, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: White, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Ballpointv2: White, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: Gray, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: Gray, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: Gray, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: Gray, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: Gray, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: White, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: White, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: White, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: White, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: White, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Markerv2: White, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Finelinerv2: Black, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Finelinerv2: Black, render=0, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Finelinerv2: Black, render=1, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Finelinerv2: Black, render=1, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Finelinerv2: Black, render=2, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Finelinerv2: Black, render=2, all-in-one, argb32) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochitl/src/brushgfx/tests/tst_brushgfx.cpp(639)]
FAIL!  : BrushesTest::testDrawOutside(Finelinerv2: Gray, render=0, segmented, rgb16) 'false' returned FALSE. ()
   Loc: [/Users/mac-builder1/actions-runner/_work/xochitl/xochi...`
