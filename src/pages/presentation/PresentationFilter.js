export default function PresentationFilter({ data, slides, setSlides, setSlideIndex, setSlide, setQuestions, setChats }) {
  if (data.presentation.presentation && slides.length === 0) {
    setSlides(() => data.presentation.presentation)
  }
  const newSlideIndex = data.presentation.slide;
  setSlideIndex(() => newSlideIndex)

  const newData = {}
  let allChat = []
  let allQuestions = []
  data.users?.forEach((user) => {
    user?.answer.forEach((answer) => {
      if (answer.slideIndex === newSlideIndex) {
        if (!newData[answer.choice])
          newData[answer.choice] = 0
        newData[answer.choice] += 1
      }
    })
    const { name, id: userId, chats, questions } = user
    console.log("user: ", userId, name)

    chats.forEach((chat) => {
      allChat.push({
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
    allChat.push({
      userId: data.host.clientId,
      name: "Host",
      message: chat.message,
      time: chat.time,
    })
  })
  data.host?.questions.forEach((question) => {
    allQuestions.push({
      userId: data.host.clientId,
      name: "Host",
      question: question.question,
      time: question.time,
    })
  })
  allChat.sort((a, b) => {
    return a.time - b.time
  })
  allQuestions.sort((a, b) => {
    return a.time - b.time
  })
  setChats(() => allChat)
  setQuestions(() => allQuestions)

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

  setSlide(() => ({ ...newSlide, content: { ...newSlide.content, data: finalData } }))
}
