let handler = async (m, { conn, text, participants, isAdmin, isOwner, groupMetadata }) => {
  let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
  m.reply(
    `*──── ╯ نــداء الــدجـيـتال ╭ ────*/n--⧽ جــروب : *${groupMetadata.subject}*\n--⧽ اعــضـاء : *${participants.length}*${text ? `\n--⧽ رســالــه : ${text}\n` : ''}\n┐━━━≼ الأعــضـاء ≽━━━\n` +
      users.map(v => '`╯ @' + v.replace(/@.+/, '') + ' ╭`').join`\n` +
      '\n┘━━━≼ الأعــضـاء ≽━━━',
    null,
    {
      mentions: users,
    }
  )
}

handler.help = ['tagall']
handler.tags = ['group']
handler.command = ['منشن','tagall']
handler.admin = true
handler.group = true

export default handler
