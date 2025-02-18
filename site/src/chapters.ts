export const getChapter = async (): Promise<string> => {
  return fetch('https://drive.google.com/file/d/1Zx02onk1dsch_mHjnFuwStH_jPDMc__H/view').then(
    function (response) {
      return response.text()
    }
  )
}
