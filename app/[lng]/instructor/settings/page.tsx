import { getUserById } from '@/actions/user.action'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tab'
import { auth } from '@clerk/nextjs'
import Header from '../_components/header'
import Account from './_components/account'
import Profile from './_components/profile'

async function Page() {
	const { userId } = auth()
	const userJSON = await getUserById(userId!)

	const user = JSON.parse(JSON.stringify(userJSON))

	return (
		<>
			<Header title='Settings' description='Manage your account settings' />
			<Separator className='my-3 bg-muted-foreground' />
			<Tabs defaultValue='profile'>
				<TabsList>
					<TabsTrigger value='profile'>Profile</TabsTrigger>
					<TabsTrigger value='password'>Password</TabsTrigger>
				</TabsList>
				<TabsContent value='profile'>
					<Profile />
				</TabsContent>
				<TabsContent value='password'>
					<Account {...user} />
				</TabsContent>
			</Tabs>
		</>
	)
}

export default Page
