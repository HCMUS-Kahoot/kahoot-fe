export default function PresentationFilter({ data, slides, setSlides, setSlideIndex, setSlide }) {
  if (data.presentation.presentation && !slides) {
    setSlides(data.presentation.presentation)
  }
  const newSlideIndex = data.presentation.slide;
  setSlideIndex(newSlideIndex)

  const newData = {}
  data.users?.reduce((acc, user) => {
    user?.answer.reduce((acc, answer) => {
      if (!acc[answer.choice])
        acc[answer.choice] = 0
      if (answer.slideIndex === newSlideIndex) {
        acc[answer.choice] += 1
      }
      return acc;
    }, acc)
  }, newData)
  const finalData = []
  for (const [key, value] of Object.entries(newData)) {
    finalData.push({ name: key, pv: value })
  }
  const newSlide = slides[newSlideIndex] || data.presentation?.presentation[newSlideIndex]

  setSlide({ ...newSlide, content: { ...newSlide.content, data: finalData } })
}
