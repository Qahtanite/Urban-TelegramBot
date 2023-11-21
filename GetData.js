module.exports = async (msg, match) => {

    //THESE WILL BE FOR USER INFO.
    let chatId = msg.chat.id || "None";
    let chatUsername = msg.chat.username || "None";
    let chatBio = msg.chat.bio || "None";
    let firstname = msg.chat.first_name || "None";
    let lastname = msg.chat.last_name || "None";
    let realName = `${firstname} ${lastname}`
    // ......
    const fs = require("fs")
    let data = {
        "Username": `${chatUsername}`,
        "ID": `${chatId}`,
        "Bio": `${chatBio}`,
        "RealName": `${realName}`,
        "Messagecount": '1',
        "Messages": [{
        "msg1": `${match[0]}`
        }]
    }
       // IF FILE DOESN'T EXIST, CREATE FILE WITH USER CHATID.
    if (!fs.existsSync(`./UserLogs/${chatId}.json`)) {
        console.log(data)
        json = JSON.stringify(data, null, 2)
        
        return await fs.writeFile(`./UserLogs/${chatId}.json`, json, error => {
            console.log(error)
        })
    } // ELSE IF FILE EXISTS, UPDATE FILE.
    else
    {
        try{
        var msgcontent = fs.readFileSync(`./UserLogs/${chatId}.json`)
        var content= JSON.parse(msgcontent)
        var msgcount = content.Messagecount;
        var Messages = content.Messages;
        content.Messagecount = String(parseInt(content.Messagecount) + 1);

        // THIS WILL UPDATE THE FILE IF THE USERNAME, BIO, OR REALNAME IS CHANGED.
        if (content.Username !== chatUsername || content.Bio !== chatBio || content.RealName !== realName) {
            content.Username = chatUsername
            content.Bio = chatBio
            content.RealName = realName
        } 
        
        let newMessageKey = `msg${content.Messagecount}`;
      // ADDING MSG1, MSG2, etc.
        Messages.push({ [newMessageKey]: match[0] });

      // NOW WE WILL TRY WRITING IT IN THE FILE.
        try {
            await fs.promises.writeFile(`./UserLogs/${chatId}.json`, JSON.stringify(content, null, 2));
            console.log('File updated successfully');
        } catch (error) {
            console.error('Error updating file:', error);
        }
    }catch(err) {
        console.error('Unexpected error, '+ err)
    }}}