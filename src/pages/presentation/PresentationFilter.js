export default function PresentationFilter({ data, slides, setSlides, setSlideIndex, setSlide }) {
  if (data.presentation.presentation && slides.length === 0) {
    setSlides(data.presentation.presentation)
  }
  const newSlideIndex = data.presentation.slide;
  setSlideIndex(newSlideIndex)

  const newData = {}
<<<<<<< HEAD
  data.users?.reduce((acc, user) => {
    user?.answer.reduce((acc, answer) => {
=======
  data.users?.forEach((user) => {
    user?.answer.forEach((answer) => {
>>>>>>> 54f13b780f9a503ef16a112ee5c038daaa5b0c2a
      if (answer.slideIndex === newSlideIndex) {
        if (!newData[answer.choice])
          newData[answer.choice] = 0
        newData[answer.choice] += 1
      }
    })
  })

  const newSlide = slides[newSlideIndex] || data.presentation?.presentation[newSlideIndex]

  const finalData = []
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
