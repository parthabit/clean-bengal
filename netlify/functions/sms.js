exports.handler = async (event) => {
  if(event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try{
    const { mobile, complaintId, district, status } = JSON.parse(event.body);
    if(!mobile || mobile.length !== 10) return { statusCode: 400, body: JSON.stringify({ error: 'Invalid mobile' }) };

    const messages = {
      new:         `Your complaint ${complaintId} in ${district} has been received. Action within 24hrs. - Clean Bengal`,
      'in-progress': `Update: Your complaint ${complaintId} is now being addressed by ${district} authority. - Clean Bengal`,
      resolved:    `Resolved: Your complaint ${complaintId} in ${district} has been resolved. Thank you! - Clean Bengal`,
    };
    const message = messages[status] || messages.new;

    const resp = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': process.env.FAST2SMS_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: 'q',
        message,
        language: 'english',
        flash: 0,
        numbers: mobile
      })
    });
    const data = await resp.json();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  }catch(e){
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};