let handler = async (m, { conn, args, groupMetadata }) => {
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender
  if (!(who in global.db.data.users)) throw `*❞لــم أجــد اي بــيـانـات لــهذا الــمـسـتـخدم !❝*`
  let warn = global.db.data.users[who].warn
  let name = conn.getName(who)
  m.reply(`
 *──── ╯ إنــذارات ╭ ────*
*--⧽ الأســم :* ${name} 
*--⧽ الإنــذارات :* ${warn}`)
}

handler.help = ['warns']
handler.tags = ['group']
handler.command = ['الانذارات', 'الإنذارات']
handler.group = true

export default handler
