function detectDevice() {
  let platform = 'Unknown';

  // Attempt to use User-Agent Client Hints
  if (navigator.userAgentData) {
      const data = navigator.userAgentData;
      if (data.platform) {
          platform = data.platform;
          return platform;
      }
  }

  // Fallback to parsing navigator.userAgent
  let userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.includes('windows')) {
      platform = 'Windows';
  } else if (userAgent.includes('android')) {
      platform = 'Android';
  } else if (userAgent.includes('iphone')) {
      platform = 'iPhone';
  } else if (userAgent.includes('ipad')) {
      platform = 'iPad';
  } else if (userAgent.includes('mac')) {
      platform = 'Mac';
  } else if (userAgent.includes('Linux')) {
      platform = 'Linux';
  }
  
  return platform;
}

async function writeToLog(message) {
    let apiUrl =  "https://api.todoist.com/rest/v2/comments";
    //Public Todoist account. Google Curtis.
    let apiToken = "8972a19cadcc698cf4843761485fd359165c061b";
    let taskId = "8199538529";

    let d = detectDevice();
    let environmentString = `
Device: ${d}
Platform: ${navigator.platform}
Screen: ${screen.width}x${screen.height} @ ${screen.colorDepth} bits
Language: ${navigator.language || navigator.languages[0]}
Time Zone Enabled: ${typeof Intl !== 'Undefined' && Intl.DateTimeFormat().resolvedOptions().timeZone}
`;

    let commentData =   {
      task_id: taskId,
      content: message + environmentString
    };
    let response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    console.log(response.status);
}