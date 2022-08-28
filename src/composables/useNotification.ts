import { notify } from 'notiwind'

function notifyError(text: string, duration = 4000) {
  notify(
    {
      group: 'error',
      title: 'Error',
      text
    },
    duration
  )
}

function notifySuccess(text: string, duration = 4000) {
  notify(
    {
      group: 'success',
      title: 'Success',
      text
    },
    duration
  )
}

export { notifyError, notifySuccess }