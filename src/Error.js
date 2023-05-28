async function SendError(error){
    const url = process.env.Discord
    //field value will have one field with the value of a markdown code block
    const dynamicContent = "Hello, world!"; // Replace with your desired dynamic value

    const data = {
      username: "Verseify API",
      embeds: [
        {
          title: "Verseify Error",
          description: "Database issue has occured.",
          color: 0xFF0000,
          fields: [
            {
              name: "API Version",
              value: "```\n" + `${Error}` + "\n```"
            }
          ]
        }
      ]
    };
    
    const otherPram = {
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(data),
        method: "POST"

    };
    fetch(url, otherPram)
}

export default SendError;