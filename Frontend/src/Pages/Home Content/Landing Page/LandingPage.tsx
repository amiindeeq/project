import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'

import { Card, CardContent } from '../../../Components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../../Components/ui/carousel'

export default function LandingPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, Autoplay: true })
  )

  const items = [
    {
      image:
        'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVza3RvcCUyMGNvbXB1dGVyfGVufDB8fDB8fHww',
    },
    {
      image:
        'https://i.pinimg.com/564x/1e/83/c1/1e83c1ace22b5f8ddeccbd8acb2b89fd.jpg',
    },
    {
      image:
        'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      image:
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D',
    },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center py-10">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full relative"
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-full w-full flex">
          {items.map((item, index) => (
            <CarouselItem key={index} className="w-full h-full flex-shrink-0">
              <Card className="shadow-lg w-full h-full border-none">
                <CardContent className="p-0 h-[60vh] px-14 rouned-[5px] ">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover rounded-[5px]"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md" />
      </Carousel>
    </div>
  )
}
