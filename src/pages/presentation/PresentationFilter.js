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
  let allChats = []
  let allQuestions = []
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
    const { name, id: userId, chats, questions } = user

    chats.forEach((chat) => {
      allChats.push({
        userId: userId,
        name: name,
        message: chat.message,
        time: chat.time,
      })
    }
    )
    questions.forEach((question) => allQuestions.push({
      userId: userId,
      name: name,
      question: question.question,
      time: question.time,
    })
    )
  })

  data.host?.chats.forEach((chat) => {
    allChats.push({
      userId: data.host.hostId,
      name: "Host",
      message: chat.message,
      time: chat.time,
    })
  })
  data.host?.questions.forEach((question) => {
    allQuestions.push({
      userId: data.host.HostId,
      name: "Host",
      question: question.question,
      time: question.time,
    })
  })
  allChats.sort((a, b) => {
    return a.time - b.time
  })
  allQuestions.sort((a, b) => {
    return a.time - b.time
  })
  // setChats(() => allChat)
  // setQuestions(() => allQuestions)

  const newSlideRaw = newSlides[newSlideIndex] || data.presentation?.presentation[newSlideIndex]

  const finalData = []
  if (Object.keys(newData).length === 0) {
    newSlideRaw.content.choices.reduce((acc, choice) => {
      acc[choice] = 0
      return acc
    }, newData)
  }

  for (const [key, value] of Object.entries(newData)) {
    finalData.push({ name: key, pv: value })
  }

  // setSlide(() => ({ ...newSlideRaw, content: { ...newSlideRaw.content, data: finalData } }))
  let newSlide = { ...newSlideRaw, content: { ...newSlideRaw.content, data: finalData }, submitted }

  return ({ newSlide, newSlideIndex, newSlides, allChats, allQuestions })
}
