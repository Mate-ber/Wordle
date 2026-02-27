export type State = {
  word: string
}

const states = {
  unknown: "#333333",
}

export function createState(): State {
  return {
    word: "dizzy",
  }
}

export function getLetterState(
  state: State,
  letter: string,
  position?: number,
): string {
  return states.unknown
}
