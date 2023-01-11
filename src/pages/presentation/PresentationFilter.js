export default function PresentationFilter({ data, slides, user: currentUser }) {
  let newSlides = {}
  if (data.presentation.presentation && slides.length === 0) {
    // setSlides(() => data.presentation.presentation)
    newSlides = data.presentation.presentation;
  }
  const newSlideIndex = data.presentation.slide;
  // setSlideIndex(() => newSlideIndex)

  const newData = {}
  let submitted = false
  let allChats = data.chats
  let allQuestions = data.questions
  if (data.presentation?.presentation[newSlideIndex]?.slideType === 'MultipleChoice') {
    data.users?.forEach((user) => {
      user?.answer.forEach((answer) => {
        if (answer.slideIndex === newSlideIndex) {
          if (!newData[answer.choice])
            newData[answer.choice] = 0
          newData[answer.choice] += 1
          if (currentUser.id === user.id)
            submitted = true
        }
      })
    })
  }
  const newSlideRaw = newSlides[newSlideIndex] || data.presentation?.presentation[newSlideIndex]

  const finalData = []
  if (Object.keys(newData).length === 0) {
    newSlideRaw?.content?.choices?.reduce((acc, choice) => {
      acc[choice] = 0
      return acc
    }, newData)
  }

  for (const [key, value] of Object.entries(newData)) {
    finalData.push({ name: key, pv: value })
  }

  const userSubmited = []
  data.users.forEach((user) => {
    user.answer.forEach((answer) => userSubmited.push({
      username: user.name,
      slideIndex: answer.slideIndex,
      choice: answer.choice,
      time: answer.time,
    })
    )
  })

  let newSlide = { ...newSlideRaw, content: { ...newSlideRaw.content, data: finalData }, submitted }

  return ({ newSlide, newSlideIndex, newSlides, allChats, allQuestions, userSubmited })
}
