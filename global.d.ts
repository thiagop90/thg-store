import en from './messages/en.json'
import pt from './messages/pt.json'

type Messages = typeof en & typeof pt

declare global {
  type IntlMessages = Messages
}
