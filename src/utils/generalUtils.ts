export const toFirstLetterUppercase = (a_String: string | null) => {
    if(!a_String) return 

    const firstLetter = a_String[0]
    const allLetters = a_String.split("")
    allLetters[0] = firstLetter.toUpperCase()
    return allLetters.join("")
}