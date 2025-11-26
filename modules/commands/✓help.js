module.exports.config = {
  name:"اوامر",
  version: "1.0.8",
  hasPermssion: 0,
  credits: "المطور: انجالاتي",
  description: "🌸",
  commandCategory: "الاوامر",
  usages: "[صفحة]",
  cooldowns: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 20
  }
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const commands = [...global.client.commands.values()]; // جميع الكوماندات
  const prefix = global.config.PREFIX || "/";

  const commandsPerPage = 10; // عدد الأوامر في الصفحة
  const page = parseInt(args[0]) || 1;
  const totalPages = Math.ceil(commands.length / commandsPerPage);

  if(page > totalPages || page < 1) {
    return api.sendMessage(`❌ هذه الصفحة غير موجودة! الصفحات المتوفرة: 1-${totalPages}`, threadID, messageID);
  }

  const start = (page - 1) * commandsPerPage;
  const end = start + commandsPerPage;
  const pageCommands = commands.slice(start, end);

  const line = "❀══════❀";

  let message = `${line} اوامر بوت ميمي ${line}\n\n`;

  pageCommands.forEach((cmd, index) => {
    message += `❀ ${start + index + 1}. 『${cmd.config.name}』\n`;
  });

  message += `\n${line}\n`;
  message += `صفحة: ${page} من ${totalPages}\n`;
  message += `اسم القائمة: اوامر 🌸\n`;
  message += `المطور: انجالاتي 🌸\n`;
  message += `البوت: ميمي 🌼\n`;
  message += `${line}`;

  return api.sendMessage(message, threadID, messageID);
};
