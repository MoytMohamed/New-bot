let war = global.maxwarn
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  if (!who) throw `✳️ Tag or mention someone\n\n📌 Example : ${usedPrefix + command} @user`
  if (!(who in global.db.data.users)) throw `*❞لــم أجــد اي بــيـانـات لــهذا الــمـسـتـخدم !❝*`
  let name = conn.getName(m.sender)
  let warn = global.db.data.users[who].warn
  if (warn < war) {
    global.db.data.users[who].warn += 1
    m.reply(
      `
 *──── ╯ إنــذار ╭ ────*

*--⧽ الــمـشـرف:* ${name}
*--⧽ الــشـخص:* @${who.split`@`[0]}
*--⧽ الإنــذارات:* ${warn + 1}/${war}
*--⧽ الــسبب:* ${text}`,
      null,
      { mentions: [who] }
    )
    m.reply(
      `
*──── ╯ إنــذار ╭ ────*
*لــقد تــلـقيـت إنذاراً مــن احـد الــمـشرفــين !*

*--⧽ عــدد الإنــذارات :* ${warn + 1}/${war}`,
      who
    )
  } else if (warn == war) {
    global.db.data.users[who].warn = 0
    m.reply(`*ســيـتم طــرد الــعضـو لأنــه قـد تــخطـى ${war} مــن الإنــذارات !*`)
    await time(3000)
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
    m.reply(
      `لــقد تــم ازالــتك مــن هــذا الــجروب *${groupMetadata.subject}* لأنــك قــد تــخـطـيت هذا الــعدد مــن الإنــذارات *${war}*`,
      who
    )
  }
}
handler.help = ['warn @user']
handler.tags = ['group']
handler.command = ['انذار', 'إنذار']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

const time = async ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
