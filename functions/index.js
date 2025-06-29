const { app } = require('@azure/functions')

app.http('router', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  route: '{*path}',
  handler: async (request, context) => {
    context.log('🚀 SaintVision AI - Enterprise Router Activated')
    
    try {
      const method = request.method
      const path = request.url || ''
      const body = method === 'POST' ? (await request.json()) || {} : {}

      if (method === 'GET') {
        return {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            success: true,
            service: 'SaintVision AI Platform - Enterprise Router',
            patent: 'Patent #10,290,222 Protected',
            timestamp: new Date().toISOString(),
            endpoints: ['onleadsubmit', 'onscheduleconfirm', 'onsignup']
          })
        }
      }

      if (method === 'POST') {
        const { full_name, email, phone, source, company, plan } = body
        
        let message = ''
        let stage = ''
        
        if (path.includes('onleadsubmit')) {
          message = `🔥 NEW LEAD: ${full_name || 'Anonymous'} from ${company || 'Website'} - Contact: ${phone || email}`
          stage = 'Docs Requested'
        } else if (path.includes('onscheduleconfirm')) {
          message = `📅 APPOINTMENT: ${full_name || 'Contact'} scheduled - Contact: ${phone || email}`
          stage = 'Appointment Scheduled'
        } else if (path.includes('onsignup')) {
          message = `✅ SIGNUP: ${full_name || 'Client'} signed up for ${plan || 'Pro'} - Contact: ${phone || email}`
          stage = 'Onboarding Started'
        }

        context.log(`📥 ${message}`)
        await sendSMS(message, context)

        return {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            success: true,
            message: 'Webhook processed + SMS sent to +19499972097',
            path: path,
            stage: stage,
            timestamp: new Date().toISOString(),
            patent: 'Patent #10,290,222 Protected'
          })
        }
      }
    } catch (error) {
      context.log('❌ Error:', error)
      return { status: 500, body: JSON.stringify({ error: error.message }) }
    }
  }
})

async function sendSMS(message, context) {
  try {
    const axios = require('axios')
    const sid = process.env.TWILIO_ACCOUNT_SID
    const token = process.env.TWILIO_AUTH_TOKEN

    if (!sid || !token) return

    await axios.post(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      new URLSearchParams({
        From: '+19499972097',
        To: '+19499972097',
        Body: `${message}\n\n🎯 SaintVision AI Platform\n👑 Patent #10,290,222 Protected`
      }), {
        headers: {
          Authorization: `Basic ${Buffer.from(sid + ':' + token).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    context.log('✅ SMS sent to +19499972097')
  } catch (error) {
    context.log('❌ SMS Error:', error.message)
  }
}

