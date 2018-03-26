import test from "ava"

function sum(a: number, b: number) {
  return a + b
}

test("adds 1 + 2 to equal 3", t => {
  t.true(sum(1, 2) === 3)
})
