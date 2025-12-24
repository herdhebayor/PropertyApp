/** @format */
import Hero from '@/components/Hero'
import InfoBoxes from '@/components/InfoBoxes'
import HomeProperties from '@/components/HomeProperties'
import connectDB from '@/database'
import FeatureProperty from '@/components/FeatureProperties'

const HomePage = () => {
	connectDB()

	return (
		<div>
			<Hero />
			<InfoBoxes />
			<FeatureProperty/>
			<HomeProperties />
		</div>
	)
}

export default HomePage
