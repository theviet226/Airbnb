
import HomeCarousel from './home-carousel'
import HomeLocal from './home-local'
import HomePreferential from './home-preferential'
import HomeSale from './home-sale'
import HomeTypeRoom from './home-type-room'

export default function Home() {
  return (
    <div>
      <HomeCarousel/>
      <HomeLocal/>
      <HomePreferential/>
      <HomeTypeRoom/>
      <HomeSale/>
    </div>
  )
}
