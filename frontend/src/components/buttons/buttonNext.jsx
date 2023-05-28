import { useSwiper } from "swiper/react";

export default function SwiperButtonNext({ children }) {
  const swiper = useSwiper();
  return <button onClick={() => swiper.slideNext()}>{children}</button>;
}
