async function SendError(urlA, error){
    const url = urlA;
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
              value: "```\n" + `${error}` + "\n```"
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