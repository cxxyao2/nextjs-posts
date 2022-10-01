import { PostPageProps } from '../interfaces/post-page-props'

export function sortByDate(a: PostPageProps, b: PostPageProps) {
  return new Date(b.frontmatter['date']) > new Date(a.frontmatter['date'])
    ? 1
    : -1
}

export function validatedate(inputText: string): boolean {
  let dateformat =
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
  // Match the date format through regular expression
  if (inputText.match(dateformat)) {
    // todo document.text1.focus();
    //Test which seperator is used '/' or '-'
    let opera1 = inputText.split('/')
    let opera2 = inputText.split('-')
    let lopera1 = opera1.length
    let lopera2 = opera2.length
    // Extract the string into month, date and year
    let pdate: any
    if (lopera1 > 1) {
      pdate = inputText.split('/')
    } else if (lopera2 > 1) {
      pdate = inputText.split('-')
    }
    let dd = parseInt(pdate[0])
    let mm = parseInt(pdate[1])
    let yy = parseInt(pdate[2])
    // Create list of days of a month [assume there is no leap year by default]
    let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (mm == 1 || mm > 2) {
      if (dd > ListofDays[mm - 1]) {
        return false
      }
    }
    if (mm == 2) {
      let lyear = false
      if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
        lyear = true
      }
      if (lyear == false && dd >= 29) {
        return false
      }
      if (lyear == true && dd > 29) {
        return false
      }
    }
  }
  return false
}

export function validateEmail(emailAddress: string): boolean {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)) {
    return true
  }
  return false
}

export function validateLengthRange(
  inputtxt: string,
  minlength: number,
  maxlength: number
): boolean {
  let userInput = inputtxt
  if (userInput.length >= minlength && userInput.length <= maxlength) {
    return true
  }
  return false
}

export function convertDateToYYYYmmDD(argDate: Date): string {
  const year = argDate.getFullYear()
  const month = argDate.getMonth() + 1
  const day = argDate.getDate()

  const monthString = month.toString()
  const dayString = day.toString()
  const finalMonth = monthString.padStart(2, '0') // 01,02,..12
  const finalDay = dayString.padStart(2, '0') // 01,02,...31

  // YYYY-mm-DD
  const dateString = year.toString() + '-' + finalMonth + '-' + finalDay
  return dateString
}
