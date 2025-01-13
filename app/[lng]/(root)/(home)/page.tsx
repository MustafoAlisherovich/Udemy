import Categories from './_components/categories'
import FeaturedCourses from './_components/featured-curses'
import Hero from './_components/hero'
import Instructor from './_components/instructor'
import LearningJourney from './_components/learning-journey'

function Page() {

	return <>
		<Hero />
		<FeaturedCourses />
		<Categories />
		<Instructor />
		<LearningJourney />
	</>
}

export default Page
