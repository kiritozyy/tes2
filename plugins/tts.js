import fetch from 'node-fetch' 

const defaultLang = 'id'
let handler = async (m, { conn, args }) => {

  let lang = args[0]
  let text = args.slice(1).join(' ')
  if ((args[0] || '').length !== 2) {
    lang = defaultLang
    text = args.join(' ')
  }
  if (!text && m.quoted && m.quoted.text) text = m.quoted.text

  let url = await (await fetch(`https://saipulanuar.ga/api/text-to-audio/tts?text=${text}&idbahasa=${lang}`)).buffer()
await conn.sendFile(m.chat, url, 'tts.opus', null, m, true, { contextInfo: { forwardingScore: 999, isForwarded: true }})

}
handler.help = ['tts <lang> <teks>']
handler.tags = ['tools']
handler.command = /^g?tts$/i
export default handler