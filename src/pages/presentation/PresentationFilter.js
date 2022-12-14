export default function PresentationFilter({ data, slides, setSlides, setSlideIndex, setSlide }) {
  if (data.presentation.presentation && slides.length === 0) {
    setSlides(data.presentation.presentation)
  }
  const newSlideIndex = data.presentation.slide;
  setSlideIndex(newSlideIndex)

  let newData = {}
  data.users?.reduce((acc, user) => {
    user?.answer.reduce((acc, answer) => {
      if (answer.slideIndex === newSlideIndex) {
        if (!acc[answer.choice])
          acc[answer.choice] = 0
        acc[answer.choice] += 1
      }
      return acc;
    }, acc)
  }, newData)

  const newSlide = slides[newSlideIndex] || data.presentation?.presentation[newSlideIndex]

  let finalData = []
  if (Object.keys(newData).length === 0) {
    newSlide.content.choices.reduce((acc, choice) => {
      acc[choice] = 0
      return acc
    }, newData)
  }

  for (const [key, value] of Object.entries(newData)) {
    finalData.push({ name: key, pv: value })
  }

  setSlide({ ...newSlide, content: { ...newSlide.content, data: finalData } })
}
