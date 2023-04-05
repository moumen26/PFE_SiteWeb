import { React } from "react";
import { useSwiper } from "swiper/react";

export default function SlideBackButton() {
  const swiper = useSwiper();

  return <button onClick={() => swiper.slidePrev()}>Back</button>;
}
