export type Word = {
  word: string
}

export async function getWord(): Promise<Word> {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?length=5",
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Cannot get word. ${text}`)
  }

  const data = (await response.json()) as string[]
  return { word: data[0] }
}
