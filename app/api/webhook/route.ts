import { createUser, updateUser } from '@/actions/user.action'
import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'

export async function POST(req: Request) {
	const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET

	if (!WEBHOOK_SECRET) {
		throw new Error(
			'Please add WEBHOOK_SECRET from Clerk Dashboard to .env.local'
		)
	}

	const headerPayload = headers()
	const svixId = headerPayload.get('svix_id')
	const svixTimestamp = headerPayload.get('svix_timestamp')
	const svixSignature = headerPayload.get('svix_signature')

	if (!svixId || !svixTimestamp || !svixSignature) {
		return new Response('Error occured -- no svix headers', {
			status: 400,
		})
	}

	const payload = await req.json()
	const body = JSON.stringify(payload)

	const wh = new Webhook(WEBHOOK_SECRET)

	let evt: WebhookEvent

	try {
		evt = wh.verify(body, {
			'svix-id': svixId,
			'svix-timestamp': svixTimestamp,
			'svix-signature': svixSignature,
		}) as WebhookEvent
	} catch (err) {
		console.error('Error: Could not verify webhook:', err)
		return new Response('Error: Verification error', {
			status: 400,
		})
	}

	const eventType = evt.type

	if (eventType === 'user.created') {
		const { id, email_addresses, image_url, first_name, last_name } = evt.data

		const user = await createUser({
			clerkId: id,
			email: email_addresses[0].email_address,
			fullName: `${first_name} ${last_name}`,
			picture: image_url,
		})

		return NextResponse.json({ message: 'OK', user: user })
	}

	if (eventType === 'user.updated') {
		const { id, email_addresses, image_url, first_name, last_name } = evt.data

		const user = await updateUser({
			clerkId: id,
			updatedData: {
				email: email_addresses[0].email_address,
				fullName: `${first_name} ${last_name}`,
				picture: image_url,
			},
		})

		return NextResponse.json({ message: 'OK', user: user })
	}
}
