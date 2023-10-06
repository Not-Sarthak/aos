const AoLoader = require('@permaweb/ao-loader')
const fs = require('fs')

async function main() {
  const wasm = fs.readFileSync('./contract.wasm')
  console.time('aos')
  const handle = AoLoader(wasm)
  console.timeEnd('aos')
  console.time('aos2')
  const result = await handle(
    {
      name: "AOS", owner: "tom", env: { logs: [] }, inbox: []
    },
    {
      caller: "tom", input: {
        function: "eval",
        data: "return sendMsg('tom', 'this is your message')"
      }
    },
    {
      transaction: {
        tags: {
          Caller: "tom"
        }
      }
    }
  )
  console.timeEnd('aos2')
  console.log(JSON.stringify(result))

}

main()