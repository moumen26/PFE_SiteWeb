import { useSwiper } from "swiper/react";

export default function SwiperButtonBack({ children }) {
  const swiper = useSwiper();
  return <button onClick={() => swiper.slidePrev()}>{children}</button>;
}
